import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.cos().sub(1);
    expect(result.re).toBeCloseTo(-0.005, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});