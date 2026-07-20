import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should detect the mutation in the asec method', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});