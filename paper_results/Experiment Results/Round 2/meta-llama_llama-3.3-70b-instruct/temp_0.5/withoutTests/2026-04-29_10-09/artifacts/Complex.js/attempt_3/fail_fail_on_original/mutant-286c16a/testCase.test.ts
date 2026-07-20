import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});