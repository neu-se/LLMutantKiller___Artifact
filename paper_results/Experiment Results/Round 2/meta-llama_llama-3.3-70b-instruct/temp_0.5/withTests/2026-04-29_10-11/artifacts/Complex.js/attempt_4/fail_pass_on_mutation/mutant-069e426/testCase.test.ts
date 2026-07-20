import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should detect the mutation in the asec method', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    const result2 = new Complex(0, 1).asec();
    expect(result.re).not.toEqual(result2.re);
  });
});