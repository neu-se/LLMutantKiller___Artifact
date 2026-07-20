import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for the cosm1 function with a small input", () => {
    const x = 0.0001;
    const resultOriginal = Math.cos(x) - 1;
    const resultComplex = (Math.cos(x) - 1) - (x * x * (x * x * (x * x / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320);
    expect(resultComplex).toBeCloseTo(resultOriginal);
  });
});