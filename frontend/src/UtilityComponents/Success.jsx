function Success({ Message, onclose }) {
  return (
    <div className="success-modal">
      <h2>Success</h2>
      <p>{Message}</p>
      <button onClick={onclose}>OK</button>
    </div>
  );
}

export default Success;
