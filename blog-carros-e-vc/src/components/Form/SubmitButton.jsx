const SubmitButton = ({ loading, text, loadingText = "Aguarde..." }) => {
  
  return (
    <button className="btn" disabled={loading}>
      {loading ? loadingText : text}
    </button>
  );
};

export default SubmitButton;
