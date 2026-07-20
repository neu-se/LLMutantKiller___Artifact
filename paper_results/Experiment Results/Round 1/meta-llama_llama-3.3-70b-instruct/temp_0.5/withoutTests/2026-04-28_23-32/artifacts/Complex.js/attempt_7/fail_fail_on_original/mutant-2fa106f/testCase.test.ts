import { Complex } from "./complex";

describe('Complex', () => {
  it('should return different results for atan when b is 1 and b is not 1', () => {
    const complex1 = new Complex(0, 1);
    const complex2 = new Complex(0, 2);
    const result1 = complex1.atan();
    const result2 = complex2.atan();
    expect(result1.im).not.toEqual(result2.im);
  });
});