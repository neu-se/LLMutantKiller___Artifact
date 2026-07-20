import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).acsc();
    const resultMutated = new Complex(0, 0).acsc();
    expect(resultOriginal.re).not.toEqual(resultMutated.re);
    expect(resultOriginal.im).not.toEqual(resultMutated.im);
  });
});