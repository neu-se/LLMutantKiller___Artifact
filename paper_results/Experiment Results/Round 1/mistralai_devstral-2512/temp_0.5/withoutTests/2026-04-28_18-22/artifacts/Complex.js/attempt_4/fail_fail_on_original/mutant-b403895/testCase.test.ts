import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute asec for complex numbers with non-zero real and zero imaginary parts", () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});