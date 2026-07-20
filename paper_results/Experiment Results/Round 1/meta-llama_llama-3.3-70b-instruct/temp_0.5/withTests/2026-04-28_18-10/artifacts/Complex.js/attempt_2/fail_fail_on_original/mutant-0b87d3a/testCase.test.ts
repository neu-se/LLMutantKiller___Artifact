import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result for acsc function when d is not zero', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.acsc().re).not.toEqual(complex.acsc().im);
  });
});