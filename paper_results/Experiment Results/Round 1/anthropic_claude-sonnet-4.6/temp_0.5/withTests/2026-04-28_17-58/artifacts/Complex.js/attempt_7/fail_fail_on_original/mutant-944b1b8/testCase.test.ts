import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("asec of 2i should produce a valid non-NaN string result", () => {
    const result = new Complex(0, 2).asec();
    // Original: Complex(PI/2, 0) -> toString = "1.5707963267948966"
    // Mutated: Complex(NaN, NaN) -> toString = "NaN"
    expect(result.toString()).not.toBe('NaN');
    expect(result.toString()).toBe(String(Math.PI / 2));
  });
});