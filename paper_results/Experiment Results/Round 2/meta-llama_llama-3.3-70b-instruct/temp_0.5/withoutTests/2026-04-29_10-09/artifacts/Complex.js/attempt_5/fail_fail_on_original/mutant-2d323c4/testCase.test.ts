import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const expected = new Complex(1, 2).acsch();
    expect(result.re).toEqual(expected.re);
    expect(result.im).toEqual(expected.im);
  });
});