import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate csch for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(result.im).not.toBeCloseTo(2 * Math.cosh(1) * Math.sin(1) * (Math.cos(2 * 1) - Math.cosh(2 * 1)), 5);
  });
});