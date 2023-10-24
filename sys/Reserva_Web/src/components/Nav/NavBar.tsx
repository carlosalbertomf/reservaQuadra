import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import LoginButton from "../google/GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <Link className="navbar-brand" to="/">
        Sistema de Reservas
      </Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {/* Adicione mais links conforme necessário */}
        </ul>
      </div>

      <div>
      <GoogleOAuthProvider clientId="1006684757422-7dmvh1g1rva7k21euq9hfifaej1tctss.apps.googleusercontent.com">
        <LoginButton />
        {/* <GoogleLogoutComponent /> */}
      </GoogleOAuthProvider>
    
      </div>
    </nav>
    
  );
};

export default Navbar;
