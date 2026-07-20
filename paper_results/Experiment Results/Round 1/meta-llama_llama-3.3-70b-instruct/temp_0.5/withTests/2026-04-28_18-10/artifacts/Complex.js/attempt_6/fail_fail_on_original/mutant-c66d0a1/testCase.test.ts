import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const c = new Complex(1, 2);
    const d = c.acsc();
    expect(d.re).not.toBeNaN();
    expect(d.im).not.toBeNaN();
    expect(d.re).not.toEqual(0);
    expect(d.im).not.toEqual(0);
  });
});