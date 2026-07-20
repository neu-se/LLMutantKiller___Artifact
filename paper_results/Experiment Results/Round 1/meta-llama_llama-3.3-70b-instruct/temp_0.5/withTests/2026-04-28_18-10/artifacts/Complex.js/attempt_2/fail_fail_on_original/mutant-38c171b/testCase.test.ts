import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 5);
    // Additional assertion to check for NaN
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});