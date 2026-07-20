import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const complex = new Complex(1, 2);
    complex['re'] = -complex['im'];
    const result = complex.asinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});