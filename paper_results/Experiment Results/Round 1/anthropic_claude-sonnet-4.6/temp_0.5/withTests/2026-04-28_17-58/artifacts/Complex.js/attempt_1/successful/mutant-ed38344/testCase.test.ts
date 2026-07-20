import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when subtracting a finite number from Infinity", () => {
    const result = Complex.INFINITY.sub(new Complex(1, 2));
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});