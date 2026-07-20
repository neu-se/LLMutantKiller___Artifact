import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have an asec method that is a function', () => {
    const complex = new Complex(1, 0);
    expect(typeof complex.asec).toBe('function');
  });
});