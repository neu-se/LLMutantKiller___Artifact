import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const complex2 = new Complex(1, -1);
    const result2 = complex2.acsc();
    expect(result.im).not.toBeCloseTo(result2.im, 5);
  });
});