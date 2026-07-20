import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex acsch for b = 1', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.881, 3);
    expect(result.im).toBeCloseTo(0, 3);
  });
});