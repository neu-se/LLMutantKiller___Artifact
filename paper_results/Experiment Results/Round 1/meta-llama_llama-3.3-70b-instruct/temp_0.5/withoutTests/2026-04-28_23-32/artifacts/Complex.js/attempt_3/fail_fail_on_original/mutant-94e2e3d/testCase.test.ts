import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle pow correctly', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });

  it('should handle pow with zero base and positive exponent', () => {
    const c = new Complex(0, 0);
    const z = new Complex(0.5, 0);
    const result = c.pow(z);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});