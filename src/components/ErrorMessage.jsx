// Använde Claude 3.5 Sonnet för att skapa funktionalitet.
export function ErrorMessage({ message }) {
    return (
      <div className="error-container">
        <h2>Ett fel uppstod</h2>
        <p>{message}</p>
        <button onClick={() => window.location.reload()}>Försök igen</button>
      </div>
    );
  }