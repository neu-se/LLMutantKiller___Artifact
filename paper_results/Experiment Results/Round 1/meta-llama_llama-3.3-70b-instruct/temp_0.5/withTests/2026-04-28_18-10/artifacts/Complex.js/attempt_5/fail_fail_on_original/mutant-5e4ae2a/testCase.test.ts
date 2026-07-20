import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers with no imaginary part and atanh(x) = -atanh(-x)', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(-2, 0);
    const result1 = c1.atanh();
    const result2 = c2.atanh();
    expect(result1.re).toBeCloseTo(-result2.re);
    expect(result1.im).toBeCloseTo(-result2.im);
  });
});