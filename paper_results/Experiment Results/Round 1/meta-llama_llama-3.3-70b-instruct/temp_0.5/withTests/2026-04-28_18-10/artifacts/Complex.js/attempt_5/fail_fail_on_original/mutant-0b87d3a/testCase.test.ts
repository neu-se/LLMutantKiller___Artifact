import { Complex } from "../../../../../../complex.js";

describe('Complex', () => {
  it('should return correct result for acsc function when d is not zero', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(1, 1);
    expect(complex2.acsc().re).not.toEqual(complex2.acsc().im);
    const complex3 = new Complex(0, 1);
    expect(complex3.acsc().re).not.toEqual(0);
  });
});