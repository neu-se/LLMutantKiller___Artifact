import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should compute asec of a purely imaginary number without NaN in real part", () => {
    // asec(i): a=0, b=1, d=1 (nonzero), so hits the else branch
    // Original: new Complex((0 !== 0) ? 0/0 : 0, ...) => real part = 0
    // Mutated:  new Complex((true) ? 0/0 : 0, ...) => real part = NaN
    const result = new Complex(0, 1).asec();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});