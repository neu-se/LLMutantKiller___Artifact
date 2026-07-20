import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when trying to multiply zero with infinity', () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, Infinity);
    expect(() => zero.mul(infinity)).toThrowError(SyntaxError);
  });
});