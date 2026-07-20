import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate acosh correctly for a specific value', () => {
    const complex = new Complex(2, -1);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(-0.6662394324925153);
  });
});