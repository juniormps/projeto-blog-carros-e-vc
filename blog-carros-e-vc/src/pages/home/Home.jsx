//CSS
import styles from "./Home.module.css"

//Hooks
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"

//Components
import PostDetail from "../../components/PostDetail"
import LoadingState from "../../components/LoadingState"
import ErrorState from "../../components/ErrorState"
import EmptyState from "../../components/EmptyState"


const Home = () => {

    const [query, setQuery] = useState("")
    const { documents: posts, loading, error } = useFetchDocuments("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (query) {
            return navigate(`/search?q=${query}`)
        }
    }
    

  return (

    <div className={styles.home}>
        <h1>Veja os nossos posts mais recentes</h1>

        <form className={styles.search_form} onSubmit={handleSubmit}>

            <input 
                type="text"
                placeholder="Ou busque por tags..."
                onChange={(e) => setQuery(e.target.value)}
            />
            
            <button className="btn btn-dark">Pesquisar</button>

        </form>

        <div>
            {loading && <LoadingState /> }

            {error && <ErrorState message="Não foi possível carregar os posts." /> }

            {!loading && !error && posts && posts.map((post) => <PostDetail key={post.id} post={post}/> )}

            {!loading && !error && posts && posts.length === 0 && (
                <EmptyState
                    message="Não foram encontrados posts."
                    actionLabel="Criar primeiro post"
                    actionTo="/posts/create"
                />
            )}

        </div>
    </div>

  )
}

export default Home
