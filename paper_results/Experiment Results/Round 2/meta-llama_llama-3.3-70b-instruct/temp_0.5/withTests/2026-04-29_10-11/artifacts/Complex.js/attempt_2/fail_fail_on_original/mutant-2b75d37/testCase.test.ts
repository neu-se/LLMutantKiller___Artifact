import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when acotangent is called', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acot()).toThrow();
  });
});