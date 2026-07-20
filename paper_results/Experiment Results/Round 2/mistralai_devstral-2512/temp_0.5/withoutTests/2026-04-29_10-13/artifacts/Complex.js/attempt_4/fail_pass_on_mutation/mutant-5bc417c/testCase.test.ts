import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct value for complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.402359478108525);
    expect(result.im).toBeCloseTo(-0.5535743588970451);
  });
});