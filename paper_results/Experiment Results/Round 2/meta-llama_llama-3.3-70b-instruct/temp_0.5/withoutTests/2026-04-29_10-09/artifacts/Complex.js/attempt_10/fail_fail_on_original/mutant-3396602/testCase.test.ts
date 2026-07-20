import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(Math.PI / 2 - 0.000001, 1);
    const result = complex.csc();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});