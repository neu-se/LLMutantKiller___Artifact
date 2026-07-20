import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should detect the mutation in the acsch function', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).acsch();
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(resultOriginal.re);
    expect(result.im).not.toBeCloseTo(resultOriginal.im);
  });
});