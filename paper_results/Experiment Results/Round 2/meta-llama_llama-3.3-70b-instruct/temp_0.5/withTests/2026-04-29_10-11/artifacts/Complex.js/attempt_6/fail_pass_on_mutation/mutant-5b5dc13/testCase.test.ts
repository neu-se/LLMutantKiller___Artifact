import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});