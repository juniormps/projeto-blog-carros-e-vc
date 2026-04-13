import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'

//Hooks
import { useAuthValue } from "../../hooks/useAuthValue"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from "../../hooks/useDeleteDocument"
import LoadingState from "../../components/LoadingState"
import ErrorState from "../../components/ErrorState"
import EmptyState from "../../components/EmptyState"


const Dashboard = () => {

    const { user } = useAuthValue()
    const uid = user.uid

    const { documents: posts, loading, error } = useFetchDocuments("posts", null, uid)

    const { deleteDocument } = useDeleteDocument("posts")
    

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState message="Não foi possível carregar os seus posts." />
    }

  return (

    <div className={styles.dashboard}>
        <h2>Dashboard</h2>

        <p>Gerencie os seus posts</p>

        {posts && posts.length === 0 ? (
            <EmptyState
                message="Você ainda não publicou nenhum post."
                actionLabel="Criar primeiro post"
                actionTo="/posts/create"
            />
            ) : (
            <div className={styles.post_header}>
                <span>Título</span>
                <span>Ações</span>
            </div>
        )}

         {posts && posts.map((post) => (
            <div className={styles.post_row} key={post.id}>

                <p>{post.title}</p>

                <div className={styles.actions}>

                    <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>

                    <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>

                    <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">
                        Excluir
                    </button>

                </div>
            </div>
        ))}

    </div>

  )
}

export default Dashboard
