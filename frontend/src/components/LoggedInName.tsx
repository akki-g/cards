import { useNavigate } from "react-router-dom";

function LoggedInName() {
  const navigate = useNavigate(); // Use navigate for redirection

  // Retrieve user data safely
  const _ud = localStorage.getItem("user_data");
  const ud = _ud ? JSON.parse(_ud) : null;

  if (!ud) {
    return null; // If no user data, don't render anything
  }

  const { id: userId, firstName, lastName } = ud;

  const doLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.removeItem("user_data");
    navigate("/"); // Redirect using React Router
  };

  return (
    <div id="loggedInDiv">
      <span id="userName">Logged In As {firstName} {lastName}</span><br />
      <button type="button" id="logoutButton" className="buttons" onClick={doLogout}> Log Out </button>
    </div>
  );
}

export default LoggedInName;
