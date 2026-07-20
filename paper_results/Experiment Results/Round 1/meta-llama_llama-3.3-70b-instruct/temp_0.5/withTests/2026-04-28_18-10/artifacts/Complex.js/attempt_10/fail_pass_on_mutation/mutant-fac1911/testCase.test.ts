import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should detect the mutation in the acsch function', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const expected = new Complex(0.5306375309525179, -0.45227844715119064);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});