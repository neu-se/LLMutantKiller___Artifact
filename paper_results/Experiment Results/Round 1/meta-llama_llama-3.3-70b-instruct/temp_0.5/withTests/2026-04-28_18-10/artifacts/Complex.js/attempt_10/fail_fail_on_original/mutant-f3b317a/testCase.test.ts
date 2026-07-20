import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when asec is called with 0, 0 on the mutated code but not on the original code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).toThrowError();
  });
});