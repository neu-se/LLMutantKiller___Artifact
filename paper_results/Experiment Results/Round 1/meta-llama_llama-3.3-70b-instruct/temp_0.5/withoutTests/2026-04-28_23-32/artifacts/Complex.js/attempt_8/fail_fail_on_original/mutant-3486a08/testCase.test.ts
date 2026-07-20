import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(1, 3);
    expect(c1.equals(c2)).toBe(false); 
  });
});