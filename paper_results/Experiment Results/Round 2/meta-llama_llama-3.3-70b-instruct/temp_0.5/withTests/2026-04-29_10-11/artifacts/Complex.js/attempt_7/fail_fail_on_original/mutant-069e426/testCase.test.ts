import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should detect the mutation in the asec method', () => {
    const result = new Complex(0, 0).asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
    const result2 = new Complex(1, 0).asec();
    expect(result2.re).not.toBe(result.re);
  });
});