import { Complex } from "../complex";

describe('Complex', () => {
  it('should not return NaN when subtracting infinity from infinity', () => {
    const infinity = new Complex(Infinity, Infinity);
    const result = infinity.sub(infinity);
    expect(result.toString()).not.toBe('NaN');
  });
});