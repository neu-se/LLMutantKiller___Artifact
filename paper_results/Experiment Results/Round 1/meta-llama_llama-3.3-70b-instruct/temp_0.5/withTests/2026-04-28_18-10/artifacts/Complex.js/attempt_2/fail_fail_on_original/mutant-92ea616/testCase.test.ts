import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acot when d is not zero', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });

  it('should throw an error when d is zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acot()).toThrowError();
  });
});