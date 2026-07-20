import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute asec for complex numbers with zero real part and non-zero imaginary part", () => {
    const c = new Complex(0, 2);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-1.3169578969248166, 10);
  });
});