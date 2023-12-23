import { useState, useEffect } from "react";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const calculateBMI = () => {
      // Check if both parameters are provided
      if (weight === "" || height === "") {
        setBmi(null);
        return;
      }
      // Positive numbers check
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

      const bmiValue = weightFloat / (heightFloat / 100) ** 2;

      setBmi(bmiValue.toFixed(1));
      setError("");
    };

    calculateBMI();
  }, [weight, height]);

  return (
    <Wrapper>
      <Nav />
      <Main>
        <Input
          setWeight={setWeight}
          setHeight={setHeight}
          weight={weight}
          height={height}
        />
        {error && <Error errorMessage={error} />}
        <Output bmi={bmi} />
      </Main>
    </Wrapper>
  );
}

function Wrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}

function Nav() {
  return (
    <nav className="nav-bar">
      <h1>BMI Calculator</h1>
    </nav>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function Input({ setWeight, setHeight, weight, height }) {
  return (
    <form className="input">
      <h2>Enter Data</h2>
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
  );
}

function Output({ bmi }) {
  const getHealthStatus = () => {
    const healthStatus =
      bmi === null
        ? { label: "Enter valid data to calculate BMI." }
        : bmi < 18.5
        ? { label: "Underweight", color: "#f0c000" }
        : bmi < 25
        ? { label: "Normal weight", color: "#00c200" }
        : bmi < 30
        ? { label: "Overweight", color: "#e48900" }
        : { label: "Obesity", color: "#bb2500" };

    return {
      label: healthStatus.label,
      color: healthStatus.color,
    };
  };

  return (
    <div className="output">
      <h2>Your BMI</h2>
      <div className="result">
        <p className="bmi">{bmi}</p>
        <p style={{ color: getHealthStatus().color, fontWeight: 400 }}>
          {getHealthStatus().label}
        </p>
      </div>
    </div>
  );
}

function Error({ errorMessage }) {
  return <p className="error">{errorMessage}</p>;
}
