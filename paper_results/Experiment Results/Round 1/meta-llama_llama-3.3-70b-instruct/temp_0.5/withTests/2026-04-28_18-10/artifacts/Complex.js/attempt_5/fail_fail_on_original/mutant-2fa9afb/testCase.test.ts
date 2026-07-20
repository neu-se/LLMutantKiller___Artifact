import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should throw an error for acsc of (0, 0)', () => {
    const c = new Complex(0, 0);
    expect(() => c.acsc()).toThrow();
  });

  it('should not throw an error for acsc of (1, 1)', () => {
    const c = new Complex(1, 1);
    expect(() => c.acsc()).not.toThrow();
  });
});