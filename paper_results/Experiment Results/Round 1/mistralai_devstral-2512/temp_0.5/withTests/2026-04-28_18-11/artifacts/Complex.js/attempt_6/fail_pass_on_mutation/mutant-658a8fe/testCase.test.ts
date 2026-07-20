import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should compute correct result for non-zero complex number", () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.8813735870195429, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});