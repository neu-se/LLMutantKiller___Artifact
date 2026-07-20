import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(-0.9045568943023819, 5);
  });
});