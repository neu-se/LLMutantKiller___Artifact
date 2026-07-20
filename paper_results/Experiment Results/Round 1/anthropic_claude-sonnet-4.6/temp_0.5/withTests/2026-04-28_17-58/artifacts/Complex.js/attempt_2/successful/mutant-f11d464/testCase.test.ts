import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with fully imaginary base", () => {
  it("should return exact integer result for purely imaginary base raised to integer power", () => {
    // base = 2i (re=0, im=2), exponent = 3 (real integer)
    // Original: case 3 => new Complex(0, -Math.pow(2, 3)) = new Complex(0, -8)
    // Mutated: uses general formula with log/exp which may differ
    const base = new Complex(0, 2);
    const result = base.pow(3);
    // (2i)^3 = 8 * i^3 = 8 * (-i) = -8i
    expect(result.re).toBe(0);
    expect(result.im).toBe(-8);
  });
});