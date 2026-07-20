import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication with zero and infinity', () => {
    const c1 = new Complex(Infinity, 0);
    const c2 = new Complex(0, 0);
    const result = c1.mul(c2);
    expect(result.equals(Complex['NAN'])).toBe(true);

    const c3 = new Complex(0, 0);
    const c4 = new Complex(Infinity, 0);
    const result2 = c3.mul(c4);
    expect(result2.equals(Complex['NAN'])).toBe(true);

    const c5 = new Complex(0, 0);
    const c6 = new Complex(Infinity, 0);
    const result3 = c5.mul(c6);
    expect(result3.equals(Complex['NAN'])).toBe(true);
  });
});