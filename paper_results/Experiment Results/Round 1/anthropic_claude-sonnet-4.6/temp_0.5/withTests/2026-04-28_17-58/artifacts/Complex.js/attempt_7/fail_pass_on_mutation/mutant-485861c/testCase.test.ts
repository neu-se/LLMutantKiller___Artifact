import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number creation", () => {
  it("should correctly create complex number from two numeric arguments", () => {
    const c = new Complex(3, 4);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
    expect(c.abs()).toBeCloseTo(5, 10);
  });
});