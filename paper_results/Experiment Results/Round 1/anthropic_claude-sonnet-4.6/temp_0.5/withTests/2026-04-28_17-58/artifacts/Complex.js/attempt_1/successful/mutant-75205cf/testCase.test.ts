import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinite values", () => {
  it("should return INFINITY when subtracting a finite number from an infinite complex number", () => {
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    const result = inf.sub(finite);
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});