function Failed({ Message, onClose }) {
  return (
    <div className="failed-modal">
      <h2>Error</h2>
      <p>{Message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Failed;
