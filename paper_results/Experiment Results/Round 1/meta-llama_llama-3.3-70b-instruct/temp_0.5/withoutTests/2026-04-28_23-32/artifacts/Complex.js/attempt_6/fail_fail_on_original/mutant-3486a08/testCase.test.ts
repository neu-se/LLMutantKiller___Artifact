import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    expect(c1.equals(c2)).toBe(false); // This should pass on the original code and fail on the mutated code
  });
});