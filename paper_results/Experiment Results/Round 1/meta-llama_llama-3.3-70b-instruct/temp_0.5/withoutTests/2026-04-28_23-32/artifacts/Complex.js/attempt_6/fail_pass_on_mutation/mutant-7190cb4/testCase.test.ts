import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex1 = new Complex(0, 1);
    const complex2 = new Complex(0, -1);
    const result1 = complex1.acsc();
    const result2 = complex2.acsc();
    expect(result1.im).toBeLessThan(result2.im);
  });
});