import { Complex } from "./complex";

describe('Complex', () => {
  it('should throw an error when parsing a complex number with an empty string', () => {
    expect(() => new Complex('1 + 2i')).not.toThrow();
    expect(() => new Complex('1 +')).toThrow();
  });
});