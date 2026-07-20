import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of infinity and zero', () => {
    const infinity = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    const result = infinity.mul(zero, 0);
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});