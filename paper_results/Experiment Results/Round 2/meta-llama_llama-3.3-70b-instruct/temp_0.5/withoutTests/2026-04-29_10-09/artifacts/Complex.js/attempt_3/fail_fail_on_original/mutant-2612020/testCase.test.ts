import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when trying to access an undefined property', () => {
    const complex = new Complex('1+2i');
    expect(() => complex[""]).toThrow(SyntaxError);
  });
});