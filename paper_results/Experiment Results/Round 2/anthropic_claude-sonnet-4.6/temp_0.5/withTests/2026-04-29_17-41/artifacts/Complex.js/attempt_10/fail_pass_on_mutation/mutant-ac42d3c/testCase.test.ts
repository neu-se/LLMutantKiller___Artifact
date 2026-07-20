import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan of (0, -1) multiplied by i should give a real number", () => {
    // atan(0 - i) = (0, -Infinity)
    // If we take the result and check its conjugate
    const result = new Complex(0, -1).atan();
    const conj = result.conjugate();
    // conjugate of (0, -Infinity) = (0, +Infinity)
    expect(conj.im).toBe(Infinity);
    expect(conj.im).toBeGreaterThan(0);
  });
});