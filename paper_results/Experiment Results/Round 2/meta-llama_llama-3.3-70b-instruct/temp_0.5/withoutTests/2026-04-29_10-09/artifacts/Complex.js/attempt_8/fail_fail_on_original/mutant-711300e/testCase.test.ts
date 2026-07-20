import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an object with only "re" property', () => {
    expect(() => new Complex({ re: 1 })).toThrow();
  });
});