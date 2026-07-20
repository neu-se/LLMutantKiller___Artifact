import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should return correct result for non-zero complex numbers", () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.157356, 5);
    expect(result.im).toBeCloseTo(-0.321751, 5);
  });
});