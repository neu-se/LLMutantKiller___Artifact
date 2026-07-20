import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(0, 0);
    expect(complex.cosh()).toEqual(new Complex(1, 0));
  });
});