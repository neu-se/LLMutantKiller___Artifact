import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a string without i or I in the mutated code', () => {
    expect(() => new Complex('1')).not.toThrow();
    expect(() => new Complex('1+2i')).not.toThrow();
  });
});