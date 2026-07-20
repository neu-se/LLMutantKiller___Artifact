import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number with non-zero real and imaginary parts', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(-1.119769513694276, 10);
  });
});