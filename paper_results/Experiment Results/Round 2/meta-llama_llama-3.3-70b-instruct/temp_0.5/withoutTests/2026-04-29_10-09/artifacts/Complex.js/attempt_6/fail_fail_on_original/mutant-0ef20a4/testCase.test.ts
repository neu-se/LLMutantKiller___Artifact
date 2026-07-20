import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle the isZero condition in the asech function', () => {
    const complex = new Complex(0, 0);
    const resultOriginal = new Complex(0, 0).asech();
    const result = complex.asech();
    expect(result).not.toEqual(resultOriginal);
  });
});