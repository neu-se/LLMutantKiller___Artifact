import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return correct result for complex number with zero imaginary part and zero real part", () => {
    const result = new Complex(0, 0).log();
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});