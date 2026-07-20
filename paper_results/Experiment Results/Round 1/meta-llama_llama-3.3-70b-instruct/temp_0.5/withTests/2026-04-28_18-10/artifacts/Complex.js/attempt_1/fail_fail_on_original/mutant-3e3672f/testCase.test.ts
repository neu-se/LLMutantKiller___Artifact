import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly parse complex numbers with "I" notation', () => {
    const complexNumber = new Complex('3+4I');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
  });
});