import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should not mutate the original complex number after asinh call", () => {
    const c = new Complex(3, 5);
    c.asinh();
    // After asinh, the original object should be restored to re=3, im=5
    // With mutation, re will be restored to -im (original) = -5 instead of -re (modified) = -3... 
    // Actually re should be restored to original value 3
    expect(c.re).toBe(3);
    expect(c.im).toBe(5);
  });
});