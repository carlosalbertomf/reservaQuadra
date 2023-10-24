import { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../userContext";

interface CardComponentProps {
  data: string;
  hora: number;
  dia: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ data, hora, dia }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const { userData } = useUser();

  const handleMaisClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!nomeUsuario) {
      setNomeUsuario(userData.nome.split(" ")[0]+" "+userData.nome.split(" ")[1] || "Nome não disponível");
      console.log(""+userData.nome+" - "+userData.email)
    }
  };

  const handleAlterarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const novoTexto = prompt("Digite o nome de quem irá reservar:");
    if (novoTexto !== null) {
      setNomeUsuario(novoTexto);
    }
  };

  const handleExcluirClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setNomeUsuario(null);
  };

  return (
    <Card
      style={{
        height: "100px",
        width: "100px",
        backgroundColor: isHovered ? "#d8ffd8" : "",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body>
        {data && <div>Data: {new Date(data).toLocaleDateString()}</div>}
        {nomeUsuario ? (
          <div style={{ textAlign: "center", fontSize: "9px" }}>
            {nomeUsuario}
          </div>
        ) : (
          <Card.Text>
            {isHovered && (
              <FontAwesomeIcon
                icon={faPlus}
                onClick={handleMaisClick}
                style={{ cursor: "pointer" }}
              />
            )}
          </Card.Text>
        )}
      </Card.Body>
      {nomeUsuario && (
        <Card.Footer className="p-0">
          <Row className="m-1">
            <Col xs={4}>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={handleMaisClick}
                style={{ cursor: "pointer", color: "green", textAlign: "center" }}
                size="sm"
              />
            </Col>
            <Col xs={4}>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={handleAlterarClick}
                style={{ cursor: "pointer", color: "blue", textAlign: "center" }}
                size="sm"
              />
            </Col>
            <Col xs={4}>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={handleExcluirClick}
                style={{ cursor: "pointer", color: "red", textAlign: "center" }}
                size="sm"
              />
            </Col>
          </Row>
        </Card.Footer>
      )}
    </Card>
  );
};

export default CardComponent;
