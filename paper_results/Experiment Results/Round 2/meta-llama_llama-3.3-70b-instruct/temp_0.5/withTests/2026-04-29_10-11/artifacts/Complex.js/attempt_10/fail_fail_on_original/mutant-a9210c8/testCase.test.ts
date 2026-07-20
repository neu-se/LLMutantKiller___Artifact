import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});