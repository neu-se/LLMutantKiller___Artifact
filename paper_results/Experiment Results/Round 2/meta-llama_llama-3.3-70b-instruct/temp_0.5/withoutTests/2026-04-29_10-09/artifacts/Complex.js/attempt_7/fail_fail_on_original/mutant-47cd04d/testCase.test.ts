import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when adding Infinity to a finite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 2);
    const result = c1.add(c2);
    expect(result.toString()).toBe('Infinity');
    const c3 = new Complex(1, 2);
    const c4 = new Complex(Infinity, Infinity);
    const result2 = c3.add(c4);
    expect(result2.toString()).toBe('Infinity');
  });
});