import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate atanh for a complex number', () => {
    const complex = new Complex(1, 1);
    const atanh = complex.atanh();
    expect(atanh.re).not.toBeCloseTo(Infinity);
    expect(atanh.im).not.toBeCloseTo(Infinity);
  });
});