import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have an acot function that does not throw an error', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acot()).not.toThrow();
  });
});