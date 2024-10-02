 /**
 * Success Component
 * 
 * This component displays a success message after an operation completes successfully.
 * 
 * 
 * */

 
function Success({ Message, onclose }) {
  return (
    <div className="success-modal">
      <h1>Success</h1>
      <p>{Message}</p>
      <button onClick={onclose}>OK</button>
    </div>
  );
}

export default Success;
