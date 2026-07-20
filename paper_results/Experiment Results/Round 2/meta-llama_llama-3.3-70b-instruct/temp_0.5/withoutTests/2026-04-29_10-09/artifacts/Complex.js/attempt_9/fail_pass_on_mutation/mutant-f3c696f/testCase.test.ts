import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for a specific input', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).acot();
    const result = complex.acot();
    expect(result.re).toBeCloseTo(resultOriginal.re);
    expect(result.im).toBeCloseTo(resultOriginal.im);
  });
});