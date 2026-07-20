import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly handle atanh for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(-0.5493061443340548);
  });
});