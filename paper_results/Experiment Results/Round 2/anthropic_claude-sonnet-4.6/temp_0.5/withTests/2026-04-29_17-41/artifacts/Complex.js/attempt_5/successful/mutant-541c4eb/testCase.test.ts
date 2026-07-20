import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should not mutate the original complex number when computing asinh", () => {
    // The mutation corrupts this['re'] on the original object after asinh completes
    const c = new Complex(1, 2);
    c.asinh();
    // After asinh, the original object should be restored to (1, 2)
    // With the mutation, c.re becomes NaN
    expect(c.re).toBeCloseTo(1, 10);
    expect(c.im).toBeCloseTo(2, 10);
  });
});