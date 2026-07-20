import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result when inverse is called with zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.inverse();
    expect(result.toString()).toBe('Infinity');
  });
});