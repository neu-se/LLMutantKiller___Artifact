import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex Number Parser', () => {
  it('should throw an error when parsing an invalid complex number', () => {
    expect(() => new Complex({ foo: 'bar' })).toThrow(SyntaxError);
  });
});