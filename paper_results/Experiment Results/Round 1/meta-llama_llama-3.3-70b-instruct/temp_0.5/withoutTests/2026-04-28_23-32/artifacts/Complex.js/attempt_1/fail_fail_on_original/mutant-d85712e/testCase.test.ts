import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    const complex2 = new Complex('1-2i');
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBe(-2);
  });
});