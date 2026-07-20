import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.9, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBeCloseTo(0);
  });
});