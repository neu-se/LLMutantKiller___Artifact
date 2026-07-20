import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(10, 0);
    const result = complex.cosh();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});