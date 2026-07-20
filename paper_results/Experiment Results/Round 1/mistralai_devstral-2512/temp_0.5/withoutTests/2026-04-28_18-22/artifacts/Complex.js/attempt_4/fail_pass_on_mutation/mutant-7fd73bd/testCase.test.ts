import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return correct result for positive real numbers", () => {
    const result = new Complex(2, 0).log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBeCloseTo(0);
  });
});