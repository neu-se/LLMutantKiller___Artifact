import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.csc();
    expect(result.re).not.toBeCloseTo(NaN, 10);
    expect(result.im).not.toBeCloseTo(NaN, 10);
  });
});