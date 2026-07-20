import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex acsch for b !== 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.881374, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});