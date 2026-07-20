import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a non-zero real part', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(5)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});