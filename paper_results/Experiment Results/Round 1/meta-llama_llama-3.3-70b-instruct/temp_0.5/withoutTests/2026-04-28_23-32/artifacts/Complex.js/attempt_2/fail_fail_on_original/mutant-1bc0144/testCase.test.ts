import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when accessing an undefined property', () => {
    const complex = new Complex(2, 3);
    expect(() => complex.asec()).not.toThrow();
    expect(() => complex[""]).toThrowError();
  });
});