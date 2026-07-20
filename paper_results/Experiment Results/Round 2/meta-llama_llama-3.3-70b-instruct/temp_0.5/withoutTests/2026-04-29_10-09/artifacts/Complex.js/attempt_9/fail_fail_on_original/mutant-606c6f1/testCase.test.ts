import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result when adding an infinite complex number to a finite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 1);
    const result = c1.add(c2);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});