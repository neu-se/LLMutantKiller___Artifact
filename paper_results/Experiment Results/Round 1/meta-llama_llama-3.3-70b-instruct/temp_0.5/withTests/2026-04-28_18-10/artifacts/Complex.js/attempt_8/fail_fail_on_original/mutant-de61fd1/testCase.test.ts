import { Complex } from "../../complex";

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 0);
    const sech = complex.sech();
    const expected = new Complex(2 * Math.cosh(1) * Math.cos(0) / (Math.cos(0) + Math.cosh(2)), 0);
    expect(sech.re).toBeCloseTo(expected.re);
    expect(sech.im).toBeCloseTo(expected.im);
  });
});