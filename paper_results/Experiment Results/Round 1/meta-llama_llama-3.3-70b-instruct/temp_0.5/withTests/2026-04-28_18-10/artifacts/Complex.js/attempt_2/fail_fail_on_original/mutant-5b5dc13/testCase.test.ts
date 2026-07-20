import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(Math.PI / 2, 5);
  });
});