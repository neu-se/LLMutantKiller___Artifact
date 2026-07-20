import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a specific case', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(-0.48121182505960347);
    expect(result.im).toBeCloseTo(-0.8964768153014945);
    expect(complex.asec().re).not.toBeCloseTo(new Complex(1, 1).asec().re);
  });
});