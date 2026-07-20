import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(-0.6366197723675814);
  });
});