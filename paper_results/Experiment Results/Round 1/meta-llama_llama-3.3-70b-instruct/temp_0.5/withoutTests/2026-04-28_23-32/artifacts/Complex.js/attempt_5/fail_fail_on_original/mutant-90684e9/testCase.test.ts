import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone.re).toBe(1);
    expect(clone.im).toBe(2);
    complex.re = 3;
    complex.im = 4;
    expect(clone.re).toBe(1);
    expect(clone.im).toBe(2);
  });
});