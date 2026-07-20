import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
  });
});