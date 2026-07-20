import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.div(c2);
    const x = c2.re / c2.im;
    const t = c2.re * x + c2.im;
    const expectedReal = (c1.re * x + c1.im) / t;
    const expectedImaginary = (c1.im * x - c1.re) / t;
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});