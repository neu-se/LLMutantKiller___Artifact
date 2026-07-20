import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a specific value when asec is called with a and b being non-zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.toString()).not.toBe('0, Infinity');
    const complexZero = new Complex(0, 0);
    const resultZero = complexZero.asec();
    expect(resultZero.toString()).toBe('0, Infinity');
  });
});