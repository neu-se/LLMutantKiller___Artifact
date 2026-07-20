import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, 0);
    expect(c1.equals(c2)).toBe(true);
    const c3 = new Complex(2, 0);
    expect(c1.equals(c3)).toBe(false);
    // The mutation changes the equals method to always return true
    // So, this test should pass on the original code and fail on the mutated code
    expect(c1.equals(c3)).toBe(false);
  });
});