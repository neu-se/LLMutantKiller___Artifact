import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch is the inverse of sinh for a complex number with negative imaginary part", () => {
    // sinh(acsch(z)) should equal z
    // Use z = 1 - 2i, a real test of the formula correctness
    const z = new Complex(1, -2);
    const result = z.acsch();
    const check = result.sinh();
    expect(check.re).toBeCloseTo(z.re, 10);
    expect(check.im).toBeCloseTo(z.im, 10);
  });
});