import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an object without re and im properties', () => {
    expect(() => new Complex({ foo: 'bar' })).toThrow();
  });
});