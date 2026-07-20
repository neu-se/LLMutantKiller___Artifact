import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const complex = new Complex(1, 1);
    const acotResult = complex.acot();
    expect(acotResult.re).toBeCloseTo(-0.7853981633974483);
    expect(acotResult.im).toBeCloseTo(-0.7853981633974483);
  });
});