import "tailwindcss/tailwind.css";
import { ThemeProvider } from "@material-tailwind/react";

import "./App.css";
import fruitsData from "./fruits";
import { Checkbox, Select, Option, Button } from "@material-tailwind/react";
import { useState } from "react";
function App() {
  const [fruits] = useState(fruitsData);
  // const [options, setOptions] = useState(fruitsData);
  const [options, setOptions] = useState([]);
  const [selectedFruitId, setSelectedFruitId] = useState(null);

  const getFruitById = (id) => {
    return fruits.find((fruit) => fruit.id === id);
  };

  const onCheck = (e) => {
    if (e.target.checked && options.find((option) => option.id === e.target.value) === undefined) {
      setOptions([...options, getFruitById(e.target.value)]);
    } else {
      setOptions(options.filter((option) => option.id !== e.target.value));
    }
  };
  const onClick = (id) => () => {
    setSelectedFruitId(id);
  };
  return (
    <ThemeProvider>
      <div className="App">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="grid auto-rows-auto gap-4">
            <div>
              {fruits.map((fruit) => (
                <Checkbox
                  defaultChecked={options.find((option) => option.id == fruit.id)}
                  onChange={onCheck}
                  value={fruit.id}
                  key={fruit.id}
                  label={fruit.name}
                />
              ))}
            </div>
            <div className="grid grid-flow-col gap-2">
              {options.map((option) => (
                <Button
                  variant={option.id == selectedFruitId ? "filled" : "outlined"}
                  key={option.id}
                  onClick={onClick(option.id)}
                >
                  {option.name}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select label="Fruits" value={selectedFruitId} onChange={setSelectedFruitId}>
                  {options.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <p className="my-2">
              Selected Fruit:{" "}
              <b>
                {selectedFruitId} - {getFruitById(selectedFruitId)?.name}
              </b>
            </p>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
