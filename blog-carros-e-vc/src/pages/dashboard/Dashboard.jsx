import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

//Hooks
import { useAuthValue } from "../../hooks/useAuthValue";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//Components
import ConfirmModal from "../../components/ConfirmModal";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import LoadingState from "../../components/LoadingState";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading, error } = useFetchDocuments("posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("posts");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (postToDelete) {
      await deleteDocument(postToDelete.id);
      setShowConfirmModal(false);
      setPostToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setPostToDelete(null);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message="Não foi possível carregar os seus posts." />;
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

      {posts &&
        posts.map((post) => (
          <div className={styles.post_row} key={post.id}>
            <p>{post.title}</p>

            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ver
              </Link>

              <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                Editar
              </Link>

              <button
                onClick={() => handleDeleteClick(post)}
                className="btn btn-outline btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Post"
        message={`Você tem certeza que deseja excluir o post "${postToDelete?.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        isDangerous={true}
        loading={response.loading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Dashboard;
