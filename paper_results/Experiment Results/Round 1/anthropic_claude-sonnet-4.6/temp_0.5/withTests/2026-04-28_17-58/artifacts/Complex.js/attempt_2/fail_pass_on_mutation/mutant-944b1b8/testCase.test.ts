import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should compute asec of a purely imaginary number with correct real part", () => {
    // asec(2i): a=0, b=2, d=4 (nonzero)
    // The function always takes the else branch (hardcoded false condition)
    // Original: new Complex((0 !== 0) ? 0/0 : 0, ...) => real part = 0
    // Mutated:  new Complex((true) ? 0/0 : 0, ...) => real part = NaN
    const result = new Complex(0, 2).asec();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});