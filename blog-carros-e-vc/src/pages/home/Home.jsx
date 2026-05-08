//CSS
import styles from "./Home.module.css"

//Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments"

//Components
import PostDetail from "../../components/PostDetail"
import LoadingState from "../../components/LoadingState"
import ErrorState from "../../components/ErrorState"
import EmptyState from "../../components/EmptyState"
import SearchForm from "../../components/SearchForm"


const Home = () => {

    const { documents: posts, loading, error } = useFetchDocuments("posts")
    

  return (

    <div className={styles.home}>
        <h1>Veja os nossos posts mais recentes</h1>

        <SearchForm />

        <div className={styles.posts_list}>
            {loading && <LoadingState /> }

            {error && <ErrorState message="Não foi possível carregar os posts." /> }

            {!loading && !error && posts && posts.map((post) => (
                <div key={post.id} className={styles.post_item}>
                    <PostDetail post={post}/>
                </div>
            ))}

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
