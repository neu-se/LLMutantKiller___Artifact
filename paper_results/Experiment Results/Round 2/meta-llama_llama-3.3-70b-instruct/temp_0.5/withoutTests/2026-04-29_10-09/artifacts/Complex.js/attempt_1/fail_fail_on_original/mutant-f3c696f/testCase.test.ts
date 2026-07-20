import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating acot with a specific input', () => {
    const complex = new Complex(0, 1);
    expect(() => complex.acot()).toThrow();
  });
});