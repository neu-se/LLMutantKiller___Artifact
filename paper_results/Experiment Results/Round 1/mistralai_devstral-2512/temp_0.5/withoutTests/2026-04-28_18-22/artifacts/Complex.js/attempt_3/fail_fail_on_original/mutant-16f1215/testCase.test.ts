import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return correct result for complex number with non-zero real and zero imaginary parts", () => {
    const c = new Complex(0.5, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(1.4436354751788103);
    expect(result.im).toBeCloseTo(0);
  });
});