import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the acosh of a complex number', () => {
    const complex = new Complex({ re: 2, im: 0 });
    const acosh = complex.acosh();
    expect(acosh.re).toBeCloseTo(1.3169578969248166, 10);
    expect(acosh.im).toBeCloseTo(0, 10);
  });
});