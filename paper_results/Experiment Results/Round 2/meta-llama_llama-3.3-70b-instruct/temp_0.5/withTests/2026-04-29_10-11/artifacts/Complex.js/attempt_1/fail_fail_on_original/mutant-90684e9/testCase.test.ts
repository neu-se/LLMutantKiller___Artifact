import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone.re).toBe(complex.re);
    expect(clone.im).toBe(complex.im);
    expect(clone).not.toBe(complex);
  });
});