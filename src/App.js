import logo from "./logo.svg";
import "./App.css";
import { useState, useMemo, useEffect } from "react";

function App() {
  const [numbers, setNumbers] = useState([]);

  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchFromLocalStorage = localStorage.getItem("numbers");
    if (fetchFromLocalStorage) {
      formatNumbers(JSON.parse(fetchFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("numbers", JSON.stringify(numbers));
  }, [numbers]);

  const formatNumbers = (arr) => {
    if (arr.length > 1) {
      const highest = Math.max(...arr.map((item) => item.value));
      const lowest = Math.min(...arr.map((item) => item.value));
      const copiedArray = [...arr];

      // Get the position of the highest and lowest numbers, remove and put in either first or last position and also preserve the arrangement of others
      const highestIndex = copiedArray.findIndex(
        (item) => item.value === highest
      );
      copiedArray.splice(highestIndex, 1);
      copiedArray.unshift(arr.find((item) => item.value === highest));

      const lowestIndex = copiedArray.findIndex(
        (item) => item.value === lowest
      );
      copiedArray.splice(lowestIndex, 1);
      copiedArray.push(arr.find((item) => item.value === lowest));
      setNumbers([...copiedArray]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      const numArr = [...numbers, { checked: false, value: +value }];
      setNumbers([...numbers, { checked: false, value: +value }]);
      setValue("");
      formatNumbers(numArr);
    }
  };

  const handleCheck = (id) => {
    console.log(id);
    setNumbers(
      numbers.map((item, index) => {
        if (id === index) {
          item.checked = !item.checked;
        }
        return item;
      })
    );
    // const uncheckedNumbers = numbers.filter((item) => !item.checked);
    // const checkedNumbers = numbers.filter((item) => !item.checked);
    // formatNumbers(uncheckedNumbers, checkedNumbers);
  };

  // const formatted = useMemo(() => {
  //   const unCheckedArray = numbers.filter((item) => !item.checked);
  //   const checkedArray = numbers.filter((item) => item.checked);
  //   formatNumbers(unCheckedArray, checkedArray);
  // }, [numbers]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="number"> Enter Number </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>

      <div>
        {numbers.map((item, index) => (
          <div key={index}>
            <input
              onChange={() => handleCheck(index)}
              type="checkbox"
              id={index}
              checked={item.checked}
            />
            <label
              htmlFor={index}
              style={{ textDecoration: item.checked ? "line-through" : "none" }}
            >
              <span key={index}>Number {item.value}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
