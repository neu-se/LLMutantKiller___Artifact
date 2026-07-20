import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for atanh function', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});