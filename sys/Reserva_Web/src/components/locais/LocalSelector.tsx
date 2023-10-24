import React, { useEffect, useState } from "react";
import ListLocal, { LocalInterface } from "./ListLocal";

interface LocalSelectorProps {
  onSelect: (local: LocalInterface) => void;
}


const LocalSelector: React.FC<LocalSelectorProps> = ({ onSelect }) => {
  const [selectedLocal, setSelectedLocal] = useState<LocalInterface | null>(
    null
  );
  const [showList, setShowList] = useState(false);

  const handleLocalClick = (local: LocalInterface) => {
    setSelectedLocal(local);
    setShowList(false);
    onSelect(local);
  };

  useEffect(() => {
    // Use esta seção para realizar alguma ação quando um local for selecionado.
    // Pode ser uma chamada de API, atualização de estado, etc.
    if (selectedLocal) {
      console.log("Local selecionado:", selectedLocal);
    }
  }, [selectedLocal]);

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #ccc",
          marginBottom: "10px",
          paddingBottom: "5px",
        }}
      >
        <label style={{ marginRight: "10px" }}>Local:</label>
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setShowList(!showList)}
        >
          {selectedLocal ? selectedLocal.descricao : "Selecione um local"}
        </span>
      </div>

      {showList && (
        <div style={{ marginTop: "10px" }}>
          <ListLocal
            onSelect={handleLocalClick}
            selectedLocal={selectedLocal}
          />
        </div>
      )}
    </div>
  );
};

export default LocalSelector;
