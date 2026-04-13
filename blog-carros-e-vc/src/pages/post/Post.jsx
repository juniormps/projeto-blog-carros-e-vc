import styles from './Post.module.css'

//Hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import LoadingState from '../../components/LoadingState'
import ErrorState from '../../components/ErrorState'
import EmptyState from '../../components/EmptyState'


const Post = () => {

    const { id } = useParams()
    const { document: post, loading, error } = useFetchDocument("posts", id)

  return (

    <div className={styles.post_container}>

        {loading && <LoadingState message="Carregando o post..." />}

        {error && <ErrorState message="Não foi possível carregar este post." />}

        {!loading && !error && !post && (
            <EmptyState
                message="Post não encontrado."
                actionLabel="Voltar para a home"
                actionTo="/"
                actionVariant="btn btn-dark"
            />
        )}

        {!loading && !error && post && (
            <>
                <h1>{post.title}</h1>
                
                <img src={post.image} alt={post.title} />

                <p>{post.body}</p>

                <h3>Este post trata sobre:</h3>

                <div className={styles.tags}>
                    {post.tagsArray.map((tag) => (
                        <p key={tag}>
                            <span>#</span>
                            {tag}
                        </p>
                    ))}
                </div>
            </>
        )}
    </div>

  )
}

export default Post
