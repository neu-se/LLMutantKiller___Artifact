import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when subtracting infinity from infinity in the mutated code', () => {
    const infinity = new Complex(Infinity, Infinity);
    expect(() => infinity.sub(infinity)).toThrow();
  });
});