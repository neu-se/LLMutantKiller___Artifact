import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return correct result for non-zero complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).toBeCloseTo(0.5535743588970452);
    expect(result.im).toBeCloseTo(-0.4023594781085251);
  });
});