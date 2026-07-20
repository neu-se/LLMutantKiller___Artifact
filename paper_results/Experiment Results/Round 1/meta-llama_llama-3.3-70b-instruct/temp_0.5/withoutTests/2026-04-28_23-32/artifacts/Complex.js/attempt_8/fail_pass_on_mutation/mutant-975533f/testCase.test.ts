import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(2, 3);
    const result = complex.acoth();
    const resultNegated = new Complex(2, -3).acoth();
    expect(result.im).not.toBeCloseTo(resultNegated.im);
  });
});