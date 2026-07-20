import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use different implementations based on input size", () => {
    // Test with a value where the condition Math.abs(x) < 1e-9 would be true
    const smallValue = 1e-10;
    const z = new Complex(smallValue, 0);
    const result = z.cosh();

    // In the original code, for small values it should use 1 - x
    // In the mutated code, it always uses the full formula
    // The Taylor approximation (1 - x) should be different from the full formula
    const taylorResult = 1 - smallValue;
    const fullFormulaResult = (Math.exp(smallValue) + Math.exp(-smallValue)) * 0.5;

    // The original implementation should use the Taylor approximation for small values
    // So the result should be exactly equal to the Taylor approximation
    expect(result.re).toBe(taylorResult);

    // This will fail on the mutated version because it always uses the full formula
    expect(result.re).not.toBe(fullFormulaResult);
  });
});