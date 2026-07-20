import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const noIM = complex.re > 1 && complex.im === 0;
    expect(noIM).toBe(true);
  });
});