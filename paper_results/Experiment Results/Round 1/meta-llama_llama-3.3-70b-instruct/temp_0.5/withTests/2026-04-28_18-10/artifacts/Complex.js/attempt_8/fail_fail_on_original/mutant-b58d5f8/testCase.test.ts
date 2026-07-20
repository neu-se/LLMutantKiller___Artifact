import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when parsing invalid string', () => {
    expect(() => new Complex('1+2i3')).toThrowError();
  });
});