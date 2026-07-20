import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const c1 = new Complex(4, 3);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2);
    const expectedReal = (c1.re * c2.re + c1.im * c2.im) / (c2.re * c2.re + c2.im * c2.im);
    const expectedImaginary = (c1.im * c2.re - c1.re * c2.im) / (c2.re * c2.re + c2.im * c2.im);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});