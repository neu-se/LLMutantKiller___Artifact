import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific case', () => {
    const complex = new Complex(1, 1);
    const result = complex.acosh();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).not.toBe(0);
  });
});