import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return correct result for zero imaginary part with negative real part", () => {
    const result = new Complex(-1, 0).log();
    expect(result.re).toBeCloseTo(Math.log(1));
    expect(result.im).toBeCloseTo(Math.PI);
  });
});