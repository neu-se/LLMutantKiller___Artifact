import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("(0+0i)^2 should have negative zero real part via imaginary base path", () => {
    const result = new Complex(0, 0).pow(new Complex(2, 0));
    // Original: a===0 branch, case 2: Complex(-Math.pow(0,2), 0) = Complex(-0, 0)
    // Mutated: a>=0 branch: Complex(Math.pow(0,2), 0) = Complex(0, 0)
    expect(1/result.re).toBe(-Infinity); // checks for -0
    expect(result.im).toBe(0);
  });
});