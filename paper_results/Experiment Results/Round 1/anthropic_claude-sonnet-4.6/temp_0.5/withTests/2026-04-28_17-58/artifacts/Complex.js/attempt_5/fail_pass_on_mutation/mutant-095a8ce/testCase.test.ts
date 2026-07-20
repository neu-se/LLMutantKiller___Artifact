import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should return Infinity as imaginary part when acsc is called on zero", () => {
    const z = new Complex(0, 0);
    const result = z.acsc();
    // Original: Complex(PI/2, Infinity) -> im is Infinity
    // Mutated (if false): falls through to Complex(0,0).asin() -> im is 0
    expect(result.im).toBe(Infinity);
  });
});