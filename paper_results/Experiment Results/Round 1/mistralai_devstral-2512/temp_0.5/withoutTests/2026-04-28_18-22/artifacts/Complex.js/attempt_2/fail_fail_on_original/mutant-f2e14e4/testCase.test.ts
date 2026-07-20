import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return correct result for acot with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).toBeCloseTo(0.40235947813582774);
    expect(result.im).toBeCloseTo(-0.5535743588970451);
  });
});