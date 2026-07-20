import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating sech with an invalid complex number', () => {
    const complex = new Complex(NaN, NaN);
    expect(() => complex.sech()).toThrow();
  });
});