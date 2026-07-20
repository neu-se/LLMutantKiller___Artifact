import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should not mutate the original complex number when computing asinh", () => {
    // The mutation corrupts 'this' object: sets this['re'] = -this[""] instead of -this['im']
    // this[""] was set to the original im value (tmp), so mutation sets re = -original_im
    // For input (1, 0): original restores re=1, mutated sets re=0
    const c = new Complex(1, 0);
    c.asinh();
    // After asinh(), the original object should be restored to (1, 0)
    expect(c.re).toBe(1);
    expect(c.im).toBe(0);
  });
});