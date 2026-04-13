import styles from './CreatePost.module.css'

import { useState } from "react"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../hooks/useAuthValue"


const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")

    const navigate = useNavigate()

    const handleChange = (setter) => (e) => {
        setFormError("")
        setter(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError("")

        let errorMessage = ""

        // check values
        if (!title || !image || !tags || !body) {
            errorMessage = "Por favor, preencha todos os campos!"
        }

        // validate image
        if (!errorMessage) {
            try {
                new URL(image)

            } catch {
                errorMessage = "A imagem precisa ser uma URL."
            }
        }

        if (errorMessage) {
            setFormError(errorMessage)
            return
        }

        // create tags array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        const insertedDocument = await insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        // redirect to home page
        if (insertedDocument) {
            navigate("/");
        }

    }



  return (

    <div className={styles.create_post}>
        <h2>Criar post</h2>

        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>

        <form onSubmit={handleSubmit}>

            <label>
                <span>Título:</span>
                <input 
                    type="text" 
                    name='title' 
                    placeholder='E-mail do Pense num bom título...' 
                    onChange={handleChange(setTitle)}
                    value={title}
                />
            </label>

            <label>
                <span>URL da imagem:</span>
                <input 
                    type="text" 
                    name='image' 
                    placeholder='Insira uma imagem que representa seu post...' 
                    onChange={handleChange(setImage)}
                    value={image}
                />
            </label>

            <label>
                <span>Conteúdo:</span>
                <textarea 
                    name='body' 
                    placeholder='Insira o conteúdo do post' 
                    onChange={handleChange(setBody)}
                    value={body}
                ></textarea>
            </label>

            <label>
                <span>Tags:</span>
                <input 
                    type="text" 
                    name='tegs' 
                    placeholder='Insira as tags separadas por vírgula' 
                    onChange={handleChange(setTags)}
                    value={tags}
                />
            </label>

            {!response.loading && <button className='btn'>Cadastrar</button>}
            {response.loading && <button className='btn' disabled>Aguarde...</button>}

            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
            
        </form>
    </div>

  )
}

export default CreatePost
