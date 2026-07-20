import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone).not.toBeNull();
    expect(clone).not.toBeUndefined();
    expect(complex.re).toEqual(1);
    expect(complex.im).toEqual(2);
    complex.re = 3;
    complex.im = 4;
    expect(complex.re).toEqual(3);
    expect(complex.im).toEqual(4);
  });
});