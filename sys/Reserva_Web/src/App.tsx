import MenuReserva from "./components/menu/MenuReserva";
import "./App.css";
import LoginButton from "./components/google/GoogleLoginComponent"; // Ajuste o caminho conforme necessário
// import GoogleLogoutComponent from "./components/google/GoogleLogout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MeuComponenteTable from "./components/calendario/MeuComponenteTable";

function App() {
  function handleBack(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container-fluid m-0 p-0">
        <MenuReserva onBack={handleBack} />
      <GoogleOAuthProvider clientId="1006684757422-7dmvh1g1rva7k21euq9hfifaej1tctss.apps.googleusercontent.com">
        {/* <LoginButton /> */}
        {/* <GoogleLogoutComponent /> */}
      </GoogleOAuthProvider>
      <div className="">  
      <MeuComponenteTable />
      </div>
    </div>
  );
}

export default App;
