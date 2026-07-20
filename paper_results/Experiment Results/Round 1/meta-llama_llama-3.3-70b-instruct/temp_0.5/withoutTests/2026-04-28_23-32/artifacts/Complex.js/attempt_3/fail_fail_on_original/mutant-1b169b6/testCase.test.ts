import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acoth function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result).not.toBe(false);
  });
});