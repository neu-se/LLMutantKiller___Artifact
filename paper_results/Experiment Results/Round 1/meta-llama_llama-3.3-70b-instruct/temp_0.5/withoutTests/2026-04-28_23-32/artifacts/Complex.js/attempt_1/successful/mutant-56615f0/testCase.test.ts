import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.88137, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});