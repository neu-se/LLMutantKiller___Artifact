import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute asec for complex numbers with non-zero real part and zero imaginary part", () => {
    const c = new Complex(0.5, 0);
    const result = c.asec();
    expect(result.re).toBeCloseTo(1.0471975511965976, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});