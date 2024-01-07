import { useState, useEffect } from "react";
import { Wrapper } from "./components/Wrapper";
import { Nav } from "./components/Nav";
import { Main } from "./components/Main";
import { Input } from "./components/Input";
import { Error } from "./components/Error";
import { Output } from "./components/Output";

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
        {error ? <Error errorMessage={error} /> : <Output bmi={bmi} />}
      </Main>
    </Wrapper>
  );
}
