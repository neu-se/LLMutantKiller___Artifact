import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});