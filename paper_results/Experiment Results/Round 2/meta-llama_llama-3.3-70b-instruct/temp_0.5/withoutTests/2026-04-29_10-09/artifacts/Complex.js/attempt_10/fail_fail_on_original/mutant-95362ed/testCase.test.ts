import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should not throw an error when parsing an object without re and im properties in the mutated code', () => {
    expect(() => new Complex({ foo: 'bar' })).not.toThrow();
  });
});