import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate atanh for a complex number', () => {
    const complex = new Complex(1.5, 0.5);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.5493061443340548);
    expect(atanh.im).toBeCloseTo(0.5493061443340548);
  });
});