import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should not throw an error when parsing an invalid input in the mutated code', () => {
    expect(() => new Complex({})).not.toThrow();
  });
});