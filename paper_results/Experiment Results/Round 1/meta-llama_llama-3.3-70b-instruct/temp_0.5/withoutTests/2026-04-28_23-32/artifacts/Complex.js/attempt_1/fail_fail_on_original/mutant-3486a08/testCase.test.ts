import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not always return true for equals method', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    expect(c1.equals(c2)).toBe(false);
  });
});