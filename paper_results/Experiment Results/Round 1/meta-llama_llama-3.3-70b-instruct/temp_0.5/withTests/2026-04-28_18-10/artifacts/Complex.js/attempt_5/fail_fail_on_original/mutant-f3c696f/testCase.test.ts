import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 1));
    expect(result.im).toBeCloseTo(0);
  });
});