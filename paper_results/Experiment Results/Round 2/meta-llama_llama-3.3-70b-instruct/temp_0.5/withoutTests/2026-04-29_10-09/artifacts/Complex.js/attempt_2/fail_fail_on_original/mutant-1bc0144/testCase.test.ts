import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for a complex number', () => {
    const complex = new Complex(2, 3);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(-0.14189379927549255);
    expect(result.im).toBeCloseTo(-0.7959556631245677);
  });
});