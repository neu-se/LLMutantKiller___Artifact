import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when subtracting Infinity from Infinity, but return Infinity when subtracting finite from Infinity", () => {
    // Infinity - Infinity should be NaN
    const result = Complex.INFINITY.sub(Complex.INFINITY);
    expect(result.isNaN()).toBe(true);

    // Infinity - finite should be Infinity (not NaN)
    const result2 = Complex.INFINITY.sub(new Complex(1, 2));
    expect(result2.isInfinite()).toBe(true);
    expect(result2.isNaN()).toBe(false);
  });
});