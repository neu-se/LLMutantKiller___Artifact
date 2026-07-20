import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot mutation via abs", () => {
  it("abs of complex number with large components where re < im", () => {
    // Force the a < b branch with values >= 3000
    // x = re = 3000, y = im = 4000
    // a = |3000| = 3000, b = |4000| = 4000
    // a < b is true
    // original: final b = 4000/3000, result = 4000*sqrt(1+(4/3)^2) = 5000
    // mutated: final b = 4000*3000 = 12e6, result = 4000*sqrt(1+144e12) >> 5000
    const c = new Complex(3000, 4000);
    const absVal = c.abs();
    expect(absVal).toBeGreaterThan(4000);
    expect(absVal).toBeLessThan(6000);
  });
});