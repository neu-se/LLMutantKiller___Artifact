import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(-0.8964764669408133, 5);
  });
});