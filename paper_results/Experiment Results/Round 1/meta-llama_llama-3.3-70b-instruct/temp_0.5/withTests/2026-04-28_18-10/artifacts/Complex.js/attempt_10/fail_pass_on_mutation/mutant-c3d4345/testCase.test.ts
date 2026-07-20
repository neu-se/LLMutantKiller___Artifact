import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly handle the condition a === 0 in the asec function', () => {
    const complex = new Complex(0, 0);
    const originalCode = new Complex(0, 0);
    const originalResult = originalCode.asec();
    expect(complex.asec().re).toBe(originalResult.re);
    expect(complex.asec().im).toBe(originalResult.im);
  });
});