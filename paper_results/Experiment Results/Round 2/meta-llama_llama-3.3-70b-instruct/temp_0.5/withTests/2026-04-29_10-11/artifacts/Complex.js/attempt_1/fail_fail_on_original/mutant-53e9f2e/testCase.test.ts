import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    const complex = new Complex(2, 3);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340549);
    expect(result.im).toBeCloseTo(-0.46364760900080615);
  });
});