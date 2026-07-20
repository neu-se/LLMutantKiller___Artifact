import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the arcus secant of a complex number correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0.5403023058681398, 6);
    expect(result.im).toBeCloseTo(-0.4054651081081642, 6);
  });
});