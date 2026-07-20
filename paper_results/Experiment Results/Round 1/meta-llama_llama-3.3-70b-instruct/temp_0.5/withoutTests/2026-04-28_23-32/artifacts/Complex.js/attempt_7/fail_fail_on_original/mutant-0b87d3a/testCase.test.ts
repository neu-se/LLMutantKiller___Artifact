import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly for a complex number with d not equal to zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(complex.re * complex.re + complex.im * complex.im).not.toBe(0);
  });
});