import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when asec is called on the mutated code', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.asec()).toThrow();
  });
});