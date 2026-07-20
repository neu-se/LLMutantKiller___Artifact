import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});