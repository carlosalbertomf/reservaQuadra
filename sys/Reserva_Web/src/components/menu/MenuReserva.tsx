import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MenuReserva.css";

interface MenuReservaProps {
  onBack: () => void;
}

const MenuReserva: React.FC<MenuReservaProps> = ({ onBack }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`bg-dark p-3 ${isMobile ? "rounded" : "position-fixed vh-100 w-25 m-0"}`}>
      <h1 className="text-white mb-3 text-center border-bottom pb-2">Menu</h1>
      <ul className="list-unstyled">
        <li className="mb-2">
          <Link to="/local" className="btn btn-dark w-100 text-white bg-dark-hover">
            Local
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/reserva" className="btn btn-dark w-100 text-white bg-dark-hover">
            Reservas
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/usuario" className="btn btn-dark w-100 text-white bg-dark-hover">
            Usuários
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuReserva;
