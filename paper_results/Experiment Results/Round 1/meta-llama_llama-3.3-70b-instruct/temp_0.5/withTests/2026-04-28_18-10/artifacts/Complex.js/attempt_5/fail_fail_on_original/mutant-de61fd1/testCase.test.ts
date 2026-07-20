import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(0, 0);
    const sech = complex.sech();
    const expected = new Complex(2, 0);
    expect(sech.re).toBeCloseTo(expected.re);
    expect(sech.im).toBeCloseTo(expected.im);
  });
});