import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle a string with a missing imaginary part in the original code', () => {
    const c = new Complex('1+');
    expect(() => new Complex('1+')).toThrowError(SyntaxError);
  });
});