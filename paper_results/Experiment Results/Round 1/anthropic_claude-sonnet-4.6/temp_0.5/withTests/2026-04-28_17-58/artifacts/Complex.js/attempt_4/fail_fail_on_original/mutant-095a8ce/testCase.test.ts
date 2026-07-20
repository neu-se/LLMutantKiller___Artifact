import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should return Infinity as imaginary part when acsc is called on zero", () => {
    const z = new Complex(0, 0);
    const result = z.acsc();
    // Original: Complex(PI/2, Infinity), Mutated: Complex(0, 0)
    expect(isFinite(result.re)).toBe(false);
  });
});