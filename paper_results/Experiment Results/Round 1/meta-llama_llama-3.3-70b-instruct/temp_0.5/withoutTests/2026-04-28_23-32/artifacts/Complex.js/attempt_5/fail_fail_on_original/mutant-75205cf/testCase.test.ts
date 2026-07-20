import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result when subtracting Infinity from Infinity', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.sub(c2.re, c2.im);
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});