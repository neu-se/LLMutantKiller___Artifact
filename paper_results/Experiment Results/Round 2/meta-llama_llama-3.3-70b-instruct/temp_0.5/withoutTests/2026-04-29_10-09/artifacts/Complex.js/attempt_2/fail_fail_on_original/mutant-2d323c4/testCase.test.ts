import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a non-zero complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalResult = new Complex(1, 2).acsch();
    const mutatedResult = new Complex(1, 2).acsch();
    expect(mutatedResult.re).not.toBe(originalResult.re);
    expect(mutatedResult.im).not.toBe(originalResult.im);
  });
});