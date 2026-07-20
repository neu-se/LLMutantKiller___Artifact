import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(1.0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});