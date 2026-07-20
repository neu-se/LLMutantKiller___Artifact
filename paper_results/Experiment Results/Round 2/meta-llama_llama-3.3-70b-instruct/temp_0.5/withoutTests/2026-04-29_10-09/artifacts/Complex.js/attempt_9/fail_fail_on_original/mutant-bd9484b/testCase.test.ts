import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const complex = new Complex(1, -1);
    const result = complex.acosh();
    expect(result.im).toBeLessThan(0);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.acosh();
    expect(result2.im).toBeGreaterThan(0);
  });
});