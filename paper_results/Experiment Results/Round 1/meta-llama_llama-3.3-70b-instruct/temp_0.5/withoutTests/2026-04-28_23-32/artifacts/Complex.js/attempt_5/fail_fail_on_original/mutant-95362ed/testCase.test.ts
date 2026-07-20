import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should throw an error for default case', () => {
    expect(() => new Complex({ foo: 'bar' })).toThrowError(SyntaxError);
  });
});