/**
 * Failed Component
 * 
 * This component displays an error message when an operation fails.
 * 
 * */

function Failed({ Message, onClose }) {
  return (
    <div className="failed-modal">
      <h1>Error</h1>
      <p>{Message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Failed;
