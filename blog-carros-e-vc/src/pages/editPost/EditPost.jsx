import styles from "./EditPost.module.css";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthValue } from "../../hooks/useAuthValue";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import Input from "../../components/Form/Input";
import SubmitButton from "../../components/Form/SubmitButton";

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

    const isSubmitting = useRef(false);

    const handleChange = (setter) => (e) => {
        setFormError("");
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting.current) return;

        isSubmitting.current = true;

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
            isSubmitting.current = false;
            return;
        }

        // create tags array
        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

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
            isSubmitting.current = false;
        }
    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando post: {post.title}</h2>

                    <p>Altere os dados do post como desejar</p>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Título:"
                            type="text"
                            name="title"
                            placeholder="Pense em um bom título..."
                            value={title}
                            onChange={handleChange(setTitle)}
                        />

                        <Input
                            label="URL da imagem:"
                            type="text"
                            name="image"
                            placeholder="Insira uma imagem que representa seu post..."
                            value={image}
                            onChange={handleChange(setImage)}
                        />

                        <p className={styles.preview_title}>
                            Preview da imagem atual:
                        </p>

                        <img
                            className={styles.image_preview}
                            src={image}
                            alt={post.title}
                        />

                        <Input
                            label="Conteúdo:"
                            type="textarea"
                            name="body"
                            placeholder="Insira o conteúdo do post"
                            value={body}
                            onChange={handleChange(setBody)}
                        />

                        <Input
                            label="Tags:"
                            type="text"
                            name="tags"
                            placeholder="Insira as tags separadas por vírgula"
                            value={tags}
                            onChange={handleChange(setTags)}
                        />

                        <SubmitButton
                            loading={response.loading || isSubmitting.current}
                            text="Editar"
                            loadingText="Aguarde..."
                        />

                        {response.error && (
                            <p className="error">{response.error}</p>
                        )}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    );
};

export default EditPost;
