import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('1+2i\n3+4i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });
});