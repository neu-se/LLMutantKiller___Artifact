import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(0, 0);
    const result = complex.acoth();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Math.PI / 2);
  });
});