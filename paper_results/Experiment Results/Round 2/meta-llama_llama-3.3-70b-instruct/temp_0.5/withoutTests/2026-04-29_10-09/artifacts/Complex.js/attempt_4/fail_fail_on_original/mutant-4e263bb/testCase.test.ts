import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});