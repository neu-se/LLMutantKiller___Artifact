import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should detect the mutation in the asec method', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.asec();
    expect(result2.re).not.toBe(result.re);
  });
});