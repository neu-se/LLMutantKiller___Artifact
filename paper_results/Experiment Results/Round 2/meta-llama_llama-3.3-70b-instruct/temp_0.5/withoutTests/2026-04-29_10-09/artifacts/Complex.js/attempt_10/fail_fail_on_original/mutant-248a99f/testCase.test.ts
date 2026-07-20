import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle division', () => {
    const complex = new Complex(1, 1);
    const result = complex.div(1, 1);
    expect(result.re).toBe(1);
    expect(result.im).toBe(1);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.div(1, 1);
    expect(result2.re).toBe(0);
    expect(result2.im).toBe(0);
  });
});