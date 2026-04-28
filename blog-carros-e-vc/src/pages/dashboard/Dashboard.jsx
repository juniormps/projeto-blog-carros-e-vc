import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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

  const {
    documents: posts,
    loading,
    error,
  } = useFetchDocuments("posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("posts");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const [postTitle, setPostTitle] = useState("");


  const handleDeleteClick = (post) => {
    setPostId(post.id);
    setPostTitle(post.title);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!postId) return;

    const success = await deleteDocument(postId);

    if (success) {
      toast.success("Post deletado com sucesso!");
      setShowConfirmModal(false);
      setPostId(null);
      setPostTitle("");
    } else {
      toast.error("Erro ao deletar post.");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setPostId(null);
    setPostTitle("");
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
        message={
          <p>
            Você tem certeza que deseja excluir o post{" "}
            <strong>"{postTitle}"</strong>? Esta ação não pode ser desfeita.
          </p>
        }
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
