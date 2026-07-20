import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).csc();
    const result = complex.csc();
    expect(result.re).toBeCloseTo(resultOriginal.re);
    expect(result.im).toBeCloseTo(resultOriginal.im);
  });
});