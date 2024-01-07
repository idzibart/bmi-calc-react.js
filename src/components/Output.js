export function Output({ bmi }) {
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
      <h2>Your BMI is: {bmi}</h2>
      <div className="result">
        <p style={{ color: getHealthStatus().color, fontWeight: 500 }}>
          {getHealthStatus().label}
        </p>
      </div>
    </div>
  );
}
