import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an object with both "re" and "im" properties is not the same as parsing an object with only "re" property', () => {
    expect(() => new Complex({ re: 1, im: 2 })).not.toThrow();
    expect(() => new Complex({ re: 1 })).toThrow();
  });
});