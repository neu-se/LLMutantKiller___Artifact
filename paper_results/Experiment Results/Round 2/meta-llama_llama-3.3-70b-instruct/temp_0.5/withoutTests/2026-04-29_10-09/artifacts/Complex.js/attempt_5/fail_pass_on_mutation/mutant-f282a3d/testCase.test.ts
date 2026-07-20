import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers and assign 1 to the imaginary part when only "i" is provided', () => {
    const complex1 = new Complex('i');
    expect(complex1.re).toBe(0);
    expect(complex1.im).toBe(1);
  });
});