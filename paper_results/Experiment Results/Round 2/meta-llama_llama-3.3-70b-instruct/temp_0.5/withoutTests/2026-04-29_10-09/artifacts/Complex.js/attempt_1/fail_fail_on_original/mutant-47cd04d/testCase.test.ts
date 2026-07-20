import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when adding two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.add(c2);
    expect(result.toString()).toBe('Infinity');
  });
});