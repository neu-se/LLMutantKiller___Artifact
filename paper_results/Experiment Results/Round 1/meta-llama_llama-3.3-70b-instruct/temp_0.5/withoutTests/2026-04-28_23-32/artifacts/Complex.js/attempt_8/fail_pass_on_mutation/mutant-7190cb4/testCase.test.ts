import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.im).toBeLessThan(0);
  });
});