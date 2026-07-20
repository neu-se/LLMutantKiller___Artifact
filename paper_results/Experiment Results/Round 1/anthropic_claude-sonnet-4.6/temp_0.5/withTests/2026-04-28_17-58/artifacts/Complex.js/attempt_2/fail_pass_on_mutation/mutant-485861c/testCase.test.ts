import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex constructor with undefined input", () => {
  it("should have im equal to 0 when constructed with undefined, verified through arithmetic", () => {
    const c = new Complex(undefined);
    // If im is not properly set to 0, operations that depend on im will behave differently
    // Multiply by i: (0 + 0i) * (0 + 1i) = 0 + 0i
    const result = c.mul(Complex.I);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(c.isZero()).toBe(true);
  });
});