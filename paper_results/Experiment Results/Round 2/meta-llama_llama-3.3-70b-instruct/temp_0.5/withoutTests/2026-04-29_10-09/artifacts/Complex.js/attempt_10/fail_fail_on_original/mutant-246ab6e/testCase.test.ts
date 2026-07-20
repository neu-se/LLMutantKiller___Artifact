import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(-2, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(Math.cosh(-2));
    expect(result.im).toBeCloseTo(0);
  });
});