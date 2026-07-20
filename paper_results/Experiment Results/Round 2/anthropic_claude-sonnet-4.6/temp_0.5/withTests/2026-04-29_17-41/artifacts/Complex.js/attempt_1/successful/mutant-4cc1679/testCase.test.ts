import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return correct acosh for a real number greater than 1", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    const expected = Math.acosh(2);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});