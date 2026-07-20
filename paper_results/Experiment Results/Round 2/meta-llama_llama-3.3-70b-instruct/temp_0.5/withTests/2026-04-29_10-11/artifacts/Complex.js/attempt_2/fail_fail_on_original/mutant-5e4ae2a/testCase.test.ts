import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});