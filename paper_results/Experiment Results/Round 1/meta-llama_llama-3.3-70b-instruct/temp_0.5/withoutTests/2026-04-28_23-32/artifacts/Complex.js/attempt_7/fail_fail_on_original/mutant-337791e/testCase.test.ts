import { Complex } from "../../../../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex exponent', () => {
    const complex = new Complex(0, Math.PI);
    const exp = complex.exp();
    if (Math.abs(complex.im) === 0) {
      expect(exp.re).toBeCloseTo(Math.exp(complex.re), 10);
      expect(exp.im).toBeCloseTo(0, 10);
    } else {
      expect(exp.re).toBeCloseTo(Math.exp(complex.re) * Math.cos(complex.im), 10);
      expect(exp.im).toBeCloseTo(Math.exp(complex.re) * Math.sin(complex.im), 10);
    }
  });
});