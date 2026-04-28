import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthValue } from "../../hooks/useAuthValue";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  // fill form data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleChange = (setter) => (e) => {
    setFormError("");
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    let errorMessage = "";

    // check values
    if (!title || !image || !tags || !body) {
      errorMessage = "Por favor, preencha todos os campos!";
    }

    // validate image
    if (!errorMessage) {
      try {
        new URL(image);
      } catch {
        errorMessage = "A imagem precisa ser uma URL.";
      }
    }

    if (errorMessage) {
      setFormError(errorMessage);
      return;
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    const updated = await updateDocument(id, data);

    // redirect to home page
    if (updated) {
      toast.success("Post atualizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error("Erro ao atualizar post.");
    }
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>

          <p>Altere os dados do post como desejar</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                placeholder="E-mail do Pense num bom título..."
                onChange={handleChange(setTitle)}
                value={title}
              />
            </label>

            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                placeholder="Insira uma imagem que representa seu post..."
                onChange={handleChange(setImage)}
                value={image}
              />
            </label>

            <p className={styles.preview_title}>Preview da imagem atual:</p>

            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />

            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                placeholder="Insira o conteúdo do post"
                onChange={handleChange(setBody)}
                value={body}
              ></textarea>
            </label>

            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tegs"
                placeholder="Insira as tags separadas por vírgula"
                onChange={handleChange(setTags)}
                value={tags}
              />
            </label>

            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}

            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
