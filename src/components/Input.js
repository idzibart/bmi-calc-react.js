export function Input({ setWeight, setHeight, weight, height }) {
  return (
    <form className="input">
      <label>Weight (kg)</label>
      <input
        type="number"
        placeholder="kg"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        min={10}
        max={150}
      />

      <label>Height (cm)</label>
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
