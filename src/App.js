import { useState, useEffect } from "react";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // BMI calculation function
    const calculateBMI = () => {
      // Check if both parameters are provided
      if (weight === "" || height === "") {
        setBmi(null); // Reset the result if data is missing
        return;
      }

      // Check if entered data are positive numbers
      const weightFloat = parseFloat(weight);
      const heightFloat = parseFloat(height);
      if (
        isNaN(weightFloat) ||
        isNaN(heightFloat) ||
        weightFloat <= 0 ||
        heightFloat <= 0
      ) {
        setError("Please enter valid values for weight and height.");
        setBmi(null);
        return;
      }

      // BMI calculation
      const bmiValue = weightFloat / (heightFloat / 100) ** 2;

      // Set the result in the component state
      setBmi(bmiValue.toFixed(1));
      setError("");
    };

    // Call the BMI calculation function after a change in weight or height
    calculateBMI();
  }, [weight, height]);

  // Determine health status based on BMI
  const getHealthStatus = () => {
    const healthStatus =
      bmi === null
        ? { label: "Enter valid data to calculate BMI." }
        : bmi < 18.5
        ? { label: "Underweight", color: "#ffcc00" }
        : bmi < 25
        ? { label: "Normal weight", color: "#00cc00" }
        : bmi < 30
        ? { label: "Overweight", color: "#ff9900" }
        : { label: "Obesity", color: "#ff3300" };

    return {
      label: healthStatus.label,
      color: healthStatus.color,
    };
  };

  return (
    <div className="app">
      <div className="container">
        <h2>Enter Data</h2>
        <form className="data-form">
          <label>Weight:</label>
          <input
            type="number"
            placeholder="kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min={10}
            max={150}
          />

          <label>Height:</label>
          <input
            type="number"
            placeholder="cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min={80}
            max={230}
          />
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="container">
        <h2>Your BMI is:</h2>
        <div className="result">
          <p>{bmi}</p>
          <p
            className="health-status"
            style={{ color: getHealthStatus().color }}
          >
            {getHealthStatus().label}
          </p>
        </div>
      </div>
    </div>
  );
}
