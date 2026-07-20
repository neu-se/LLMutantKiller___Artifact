import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    expect(complex.csc().re).not.toBeNaN();
    expect(complex.csc().im).not.toBeNaN();
  });
});