import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when a is not zero and b is zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Infinity);
  });
});