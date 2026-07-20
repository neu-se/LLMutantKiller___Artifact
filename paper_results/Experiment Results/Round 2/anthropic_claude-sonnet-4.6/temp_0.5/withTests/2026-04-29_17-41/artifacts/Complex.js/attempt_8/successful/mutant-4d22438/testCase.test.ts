import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("abs with large real part greater than imaginary", () => {
  it("correctly computes abs when |re| > |im| and both are large", () => {
    // When a >= b (|re| >= |im|), b stays as Math.abs(im), NOT divided
    // So result = |re| * sqrt(1 + |im|^2) which is WRONG unless b should be im/re
    // This tests the NON-mutated path (a >= b)
    const c = new Complex(5000, 4000);
    const result = c.abs();
    const expected = Math.sqrt(5000 * 5000 + 4000 * 4000);
    expect(result).toBeCloseTo(expected, 3);
  });
});