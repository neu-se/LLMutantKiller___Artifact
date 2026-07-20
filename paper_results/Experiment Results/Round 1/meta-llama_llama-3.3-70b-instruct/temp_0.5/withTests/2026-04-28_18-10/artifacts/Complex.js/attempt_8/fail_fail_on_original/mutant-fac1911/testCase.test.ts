import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should detect the mutation in the acsch function', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    const mutatedComplex = new Complex(2, 0);
    const mutatedResult = mutatedComplex.acsch();
    expect(mutatedResult.re).not.toBeCloseTo(result.re);
  });
});