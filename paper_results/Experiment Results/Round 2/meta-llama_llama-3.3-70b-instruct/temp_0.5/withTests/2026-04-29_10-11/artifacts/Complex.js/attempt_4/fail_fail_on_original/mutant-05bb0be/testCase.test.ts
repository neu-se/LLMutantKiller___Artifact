import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    const originalResult = new Complex(0.5493061443340548, 0);
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});