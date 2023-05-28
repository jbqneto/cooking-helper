import { useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";

import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

type Ingredient = {
  name: string;
  qtd: number;
};

type Input = Omit<Ingredient, ""> & {
  disabled?: boolean;
};

type InputTarget = {
  target: {
    name: "name" | "qtd";
    value: string;
  };
};

function App() {
  const [isEditing, setIsEditing] = useState(-1);
  const [oldQtd, setOldQtd] = useState(0);
  const [inputs, setInputs] = useState<Input[]>([
    {
      name: "",
      qtd: 0,
    },
  ]);

  const handleAdd = () => {
    setInputs([...inputs, { name: "", qtd: 0 }]);
  };

  const handleProportions = (index: number) => {
    setOldQtd(inputs[index].qtd);
    setIsEditing(index);
  };

  const handleQtdChange = (index: number, event: any) => {
    handleFormChange(index, event);
  };

  const handleFormChange = (index: number, event: InputTarget) => {
    const ingredients = [...inputs];
    const ingredient = ingredients[index];

    if (ingredient) {
      ingredient[event.target.name] = event.target.value;
    }

    setInputs(ingredients);
  };

  const handleSave = () => {
    let _inputs = inputs.map((input) => ({
      ...input,
      disabled: true,
    }));

    if (isEditing !== -1) {
      const proportion = inputs[isEditing].qtd / oldQtd;

      _inputs = _inputs.map((input, index) => {
        return {
          ...input,
          qtd: index === isEditing ? input.qtd : input.qtd * proportion,
        };
      });

      setIsEditing(-1);
      setOldQtd(0);
    }

    setInputs(_inputs);
  };

  const getFormGroup = (index: number, input: Input) => {
    return (
      <div key={index} className="form-group">
        <TextField
          label="Ingrediente"
          value={input.name}
          name="name"
          disabled={input.disabled}
          variant="standard"
          onChange={(event) => handleFormChange(index, event)}
        />
        <TextField
          label="Quantidade"
          value={input.qtd}
          name="qtd"
          disabled={input.disabled && isEditing !== index}
          variant="standard"
          onChange={(event) => handleQtdChange(index, event)}
        />
        <EditNoteOutlinedIcon
          onClick={() => handleProportions(index)}
        ></EditNoteOutlinedIcon>
      </div>
    );
  };

  return (
    <>
      <main>
        <div className="title">
          <h2>Receitas</h2>
        </div>
        <div className="actions">
          <Button onClick={(event) => handleAdd()} variant="contained">
            Adicionar ingrediente
          </Button>
        </div>
        <div className="content">
          <form action="">
            {inputs.map((ingredient, index) => getFormGroup(index, ingredient))}
            <hr />
            <div className="btns">
              <Button onClick={(event) => handleSave()} variant="contained">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
