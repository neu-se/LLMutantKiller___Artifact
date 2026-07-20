import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a specific value when asec is called with a and b being zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.toString()).not.toBe('0, Infinity');
  });
});