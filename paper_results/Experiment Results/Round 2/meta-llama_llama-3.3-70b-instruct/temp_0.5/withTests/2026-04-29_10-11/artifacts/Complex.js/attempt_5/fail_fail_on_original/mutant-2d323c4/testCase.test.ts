import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number where d is zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrowError();
  });
});