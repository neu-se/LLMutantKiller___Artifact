import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const complex2 = new Complex(1, -1);
    const result2 = complex2.acoth();
    expect(result.im).not.toBeCloseTo(result2.im, 10);
  });
});