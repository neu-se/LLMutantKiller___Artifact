import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc of sufficiently tiny real number should give zero when d truly underflows", () => {
    // Need a small enough that a*a underflows to 0
    // MIN_VALUE = 5e-324, so need a < sqrt(5e-324) ≈ 2.2e-162
    const a = 1e-200; // (1e-200)^2 = 1e-400 < 5e-324, underflows to 0
    const result = new Complex(a, 0).acsc();
    // d = 0, early return skipped (a != 0, b = 0)
    // Original: new Complex(0, (0 !== 0) ? -0/0 : 0).asin() = new Complex(0,0).asin() = Complex(0,0)
    // Mutated:  new Complex(0, (0 === 0) ? -0/0 : 0).asin() = new Complex(0,NaN).asin() = NaN
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});