import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    expect(c1.equals(c2)).toBe(false); 
    const c3 = new Complex(1, 2);
    expect(c1.equals(c3)).toBe(true); 
    const c4 = new Complex(1, 3);
    expect(c1.equals(c4)).toBe(false); 
  });
});