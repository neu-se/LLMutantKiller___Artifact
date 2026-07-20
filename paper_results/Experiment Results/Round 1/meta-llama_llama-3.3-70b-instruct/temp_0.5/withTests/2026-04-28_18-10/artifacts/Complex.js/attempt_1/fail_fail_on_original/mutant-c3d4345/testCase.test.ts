import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate asec for a complex number', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).toThrowError(SyntaxError);
  });
});