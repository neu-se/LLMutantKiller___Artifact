import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when a = 0 and b = 0 in the mutated code', () => {
    const c = new Complex(0, 0);
    expect(() => c.asec()).toThrowError();
  });
});