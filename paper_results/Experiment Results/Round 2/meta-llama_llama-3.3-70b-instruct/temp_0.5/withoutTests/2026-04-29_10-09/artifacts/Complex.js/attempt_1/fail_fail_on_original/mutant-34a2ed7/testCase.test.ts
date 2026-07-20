import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeCloseTo(1, 10);
    expect(complex.im).toBeCloseTo(2, 10);
  });
});