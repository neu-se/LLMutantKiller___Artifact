import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the cosecans of a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const expected = new Complex(Math.sin(1) / (Math.sin(1) ** 2 + Math.sinh(2) ** 2), -Math.sinh(2) / (Math.sin(1) ** 2 + Math.sinh(2) ** 2));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});