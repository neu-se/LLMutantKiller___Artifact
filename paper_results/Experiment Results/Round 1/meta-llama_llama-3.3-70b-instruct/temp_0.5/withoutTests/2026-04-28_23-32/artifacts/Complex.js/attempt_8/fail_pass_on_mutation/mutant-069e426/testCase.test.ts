import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for asec function', () => {
    const c = new Complex(1, 0);
    const result = c.asec();
    expect(result.im).toBeCloseTo(0);
    const c2 = new Complex(0, 1);
    const result2 = c2.asec();
    expect(result2.im).not.toBeCloseTo(result.im);
  });
});