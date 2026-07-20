import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly parse complex numbers with "I" notation', () => {
    const complex = new Complex('1+I');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(1);
  });
});