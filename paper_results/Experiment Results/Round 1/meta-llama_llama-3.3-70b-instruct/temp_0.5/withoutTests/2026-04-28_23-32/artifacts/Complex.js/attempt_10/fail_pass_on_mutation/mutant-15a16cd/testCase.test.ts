import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly floor the complex number with a boolean value', () => {
    const complex = new Complex(12.3456, 7.8901);
    const floored = complex.floor(false);
    expect(floored.re).not.toBeNaN();
    expect(floored.im).not.toBeNaN();
  });
});