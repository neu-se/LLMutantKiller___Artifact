import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers with "i" suffix', () => {
    const complex = new Complex('1i');
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(1);
  });
});