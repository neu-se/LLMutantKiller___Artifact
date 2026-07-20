import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when 1 / 0 is calculated', () => {
    const complex = new Complex(1, 0);
    const result = complex.div(0, 0);
    expect(result.toString()).toBe('Infinity');
  });
});