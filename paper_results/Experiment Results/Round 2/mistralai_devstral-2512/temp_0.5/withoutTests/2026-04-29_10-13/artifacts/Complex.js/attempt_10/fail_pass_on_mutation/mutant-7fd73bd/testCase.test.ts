import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return correct result for complex number with zero imaginary part and non-positive real part", () => {
    const result = new Complex(-0.5, 0).log();
    expect(result.re).toBeCloseTo(Math.log(0.5));
    expect(result.im).toBeCloseTo(Math.PI);
  });
});