import styles from "./CreatePost.module.css";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthValue } from "../../hooks/useAuthValue";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import Input from "../../components/Form/Input";
import SubmitButton from "../../components/Form/SubmitButton";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [formError, setFormError] = useState("");

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument("posts");

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

        const insertedDocument = await insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });

        // redirect to home page
        if (insertedDocument) {
            toast.success("Post criado com sucesso!");
            navigate("/");
        } else {
            toast.error("Erro ao criar post.");
            isSubmitting.current = false;
        }
    };

    return (
        <div className={styles.create_post}>
            <h2>Criar post</h2>

            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Título"
                    type="text"
                    name="title"
                    placeholder="Pense em um bom título..."
                    value={title}
                    onChange={handleChange(setTitle)}
                />

                <Input
                    label="URL da imagem"
                    type="text"
                    name="image"
                    placeholder="Insira uma imagem que representa seu post..."
                    value={image}
                    onChange={handleChange(setImage)}
                />

                <Input
                    label="Conteúdo"
                    type="textarea"
                    name="body"
                    placeholder="Insira o conteúdo do post"
                    value={body}
                    onChange={handleChange(setBody)}
                />

                <Input
                    label="Tags"
                    type="text"
                    name="tags"
                    placeholder="Insira as tags separadas por vírgula"
                    value={tags}
                    onChange={handleChange(setTags)}
                />

                <SubmitButton
                    loading={response.loading || isSubmitting.current}
                    text="Cadastrar"
                    loadingText="Aguarde..."
                />

                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
