import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have an acot function that returns a value', () => {
    const complex = new Complex(1, 2);
    expect(complex.acot()).not.toBeUndefined();
  });
});