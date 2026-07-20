import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly handle zero and infinity in multiplication', () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, Infinity);
    expect(() => infinity.mul(zero)).not.toThrow();
    expect(() => zero.mul(infinity)).not.toThrow();
  });
});