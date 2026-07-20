import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(result.re).toBeCloseTo(-2 * Math.sinh(1) * Math.cos(1) / (Math.cos(2) - Math.cosh(2)), 10);
    expect(result.im).toBeCloseTo(2 * Math.cosh(1) * Math.sin(1) / (Math.cos(2) - Math.cosh(2)), 10);
  });
});