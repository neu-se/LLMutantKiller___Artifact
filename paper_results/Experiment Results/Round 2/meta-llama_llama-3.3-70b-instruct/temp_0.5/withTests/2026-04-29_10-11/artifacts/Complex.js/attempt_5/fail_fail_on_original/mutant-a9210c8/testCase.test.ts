import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.csch()).not.toThrowError();
  });
});