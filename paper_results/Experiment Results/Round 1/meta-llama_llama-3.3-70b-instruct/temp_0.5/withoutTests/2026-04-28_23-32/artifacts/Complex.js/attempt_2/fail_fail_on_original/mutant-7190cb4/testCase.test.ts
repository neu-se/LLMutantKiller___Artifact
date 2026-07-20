import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number with negative imaginary part', () => {
    const complex = new Complex(0, -1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(-0.8775825618903728, 5);
  });
});