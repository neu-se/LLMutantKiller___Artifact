import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 2);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.2276564391690599, 10);
    expect(result.im).toBeCloseTo(-0.443568254385115, 10);
  });
});