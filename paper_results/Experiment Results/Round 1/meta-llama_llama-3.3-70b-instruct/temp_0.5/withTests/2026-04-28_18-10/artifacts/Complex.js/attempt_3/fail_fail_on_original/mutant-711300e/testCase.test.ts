import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle objects with both real and imaginary parts', () => {
    const complex1 = new Complex({ re: 1, im: 2 });
    const complex2 = new Complex({ re: 1 });
    expect(complex1.re).toBe(1);
    expect(complex1.im).toBe(2);
    expect(complex2.re).toBe(0);
    expect(complex2.im).toBe(0);
  });
});