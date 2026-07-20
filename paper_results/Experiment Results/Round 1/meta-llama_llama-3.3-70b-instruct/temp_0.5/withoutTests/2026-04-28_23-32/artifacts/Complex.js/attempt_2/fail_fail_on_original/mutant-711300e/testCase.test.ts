import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex class', () => {
  it('should correctly parse complex numbers from objects', () => {
    const complex1 = new Complex({ re: 1, im: 2 });
    const complex2 = new Complex({ re: 1 });
    expect(complex1.re).toBe(1);
    expect(complex1.im).toBe(2);
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(0);
  });
});