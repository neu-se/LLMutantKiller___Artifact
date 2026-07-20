import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(-0.4026531897733124, 10);
    expect(result.im).toBeCloseTo(-0.9159655941772191, 10);
  });
});