import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should handle pow with zero base and positive exponent correctly', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});