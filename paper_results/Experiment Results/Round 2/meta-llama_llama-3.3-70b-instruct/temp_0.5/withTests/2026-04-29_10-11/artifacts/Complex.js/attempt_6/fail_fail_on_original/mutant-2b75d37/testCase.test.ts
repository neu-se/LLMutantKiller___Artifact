import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when trying to access a non-existent method', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.nonExistentMethod()).toThrow();
  });

  it('should not throw an error when trying to access the acot method', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acot()).not.toThrow();
  });
});