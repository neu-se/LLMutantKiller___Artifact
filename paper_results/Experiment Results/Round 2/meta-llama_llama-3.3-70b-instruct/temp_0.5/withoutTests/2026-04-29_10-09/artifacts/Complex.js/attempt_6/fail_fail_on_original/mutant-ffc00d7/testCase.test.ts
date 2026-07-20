import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number string', () => {
    const complex = new Complex('i');
    expect(complex.re).toBeCloseTo(0);
    expect(complex.im).toBeCloseTo(1);
  });
});