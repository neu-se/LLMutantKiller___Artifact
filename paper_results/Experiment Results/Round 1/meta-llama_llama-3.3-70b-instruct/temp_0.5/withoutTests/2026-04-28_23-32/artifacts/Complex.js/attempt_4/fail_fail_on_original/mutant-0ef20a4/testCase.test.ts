import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result when 1 / 0 is calculated', () => {
    const complex = new Complex(0, 0);
    const result = complex.inverse();
    expect(result.toString()).toBe('Infinity');
  });
});