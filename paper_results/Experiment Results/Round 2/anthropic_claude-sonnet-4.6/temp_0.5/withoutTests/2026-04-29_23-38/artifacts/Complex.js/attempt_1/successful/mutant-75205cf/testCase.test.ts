import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinite operands", () => {
  it("should return INFINITY when subtracting a finite number from infinity", () => {
    const result = Complex.INFINITY.sub(new Complex(1, 2));
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});