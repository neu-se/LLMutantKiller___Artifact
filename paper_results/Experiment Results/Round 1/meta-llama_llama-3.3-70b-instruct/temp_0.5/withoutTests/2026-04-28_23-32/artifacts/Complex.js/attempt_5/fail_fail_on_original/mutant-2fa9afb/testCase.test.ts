import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex sinh correctly for zero input and fail for mutated code', () => {
    const c = new Complex(0, 0);
    const result = c.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    if (c.re !== 0 || c.im !== 0) {
      throw new Error('Test failed');
    }
  });
});