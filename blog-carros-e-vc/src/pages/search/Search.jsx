import styles from './Search.module.css'
//Hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

//Components
import PostDetail from '../../components/PostDetail'
import LoadingState from '../../components/LoadingState'
import ErrorState from '../../components/ErrorState'
import EmptyState from '../../components/EmptyState'


const Search = () => {

    const query = useQuery()
    const search = query.get("q")

    const { documents: posts, loading, error } = useFetchDocuments("posts", search)

  return (

    <div className={styles.search_container}>

        <h1>Resultados encontrados para: {search}</h1>
        
        <div className={styles.results}>
            {loading && <LoadingState />}

            {error && <ErrorState message="Não foi possível carregar o resultado da busca." />}

            {!loading && !error && posts && posts.length === 0 && (
                <EmptyState
                    message="Não foram encontrados posts a partir da sua busca."
                    actionLabel="Voltar"
                    actionTo="/"
                    actionVariant="btn btn-dark"
                />
            )}
            
            {!loading && !error && posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}

        </div>
    </div>

  )
}

export default Search
