import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 1);
    const acsc = complex.acsc();
    expect(acsc.re).not.toBeNaN();
    expect(acsc.im).not.toBeNaN();
    expect(acsc.re).not.toBe(0);
    expect(acsc.im).not.toBe(0);
    expect(acsc.re).not.toBe(acsc.im);
  });
});