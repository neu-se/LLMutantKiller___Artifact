import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const sech = complex.sech();
    expect(sech.re).not.toBeNaN();
    expect(sech.im).toBeCloseTo(0, 1e-10);
  });
});