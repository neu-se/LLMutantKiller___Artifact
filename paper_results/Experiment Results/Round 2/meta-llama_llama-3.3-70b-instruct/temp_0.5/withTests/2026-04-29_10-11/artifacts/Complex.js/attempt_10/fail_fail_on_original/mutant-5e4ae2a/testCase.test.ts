import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    const d = new Complex(-2, 0);
    const result2 = d.atanh();
    expect(result.im).toBeCloseTo(-result2.im);
  });
});