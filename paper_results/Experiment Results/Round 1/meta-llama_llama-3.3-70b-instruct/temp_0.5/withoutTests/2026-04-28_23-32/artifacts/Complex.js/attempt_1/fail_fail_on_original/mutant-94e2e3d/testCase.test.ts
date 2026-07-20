import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle pow correctly', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1, 0);
    const result = c.pow(z);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});