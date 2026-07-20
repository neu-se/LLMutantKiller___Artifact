import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of a real number should return real result not (0, PI/2)", () => {
    // Original: b===0, returns new Complex(Math.atan2(1, 2), 0) ≈ (0.4636, 0)
    // Mutated (if true): always returns new Complex(0, Math.PI/2)
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(Math.atan2(1, 2));
    expect(result.im).toBeCloseTo(0);
  });
});