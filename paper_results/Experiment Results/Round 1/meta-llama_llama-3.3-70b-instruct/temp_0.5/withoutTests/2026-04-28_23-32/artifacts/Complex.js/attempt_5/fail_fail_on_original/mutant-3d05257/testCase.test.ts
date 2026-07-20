import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const c = new Complex({ re: Math.cosh(1), im: 0 });
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});