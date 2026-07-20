import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number with real part equal to the sum of the real parts and imaginary part equal to the sum of the imaginary parts when adding two complex numbers', () => {
    const complex1 = new Complex(1, 2);
    const complex2 = new Complex(3, 4);
    const result = complex1.add(complex2);
    expect(result.re).toBe(4);
    expect(result.im).toBe(6);
  });

  it('should not return NaN when adding Infinity to any complex number', () => {
    const infinity = new Complex(Infinity, 0);
    const complex = new Complex(1, 2);
    const result = infinity.add(complex);
    expect(result.isNaN()).toBe(false);
  });
});