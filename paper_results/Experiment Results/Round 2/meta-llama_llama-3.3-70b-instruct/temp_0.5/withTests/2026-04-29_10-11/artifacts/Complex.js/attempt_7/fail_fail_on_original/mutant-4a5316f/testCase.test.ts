import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(-0.5, 10);
  });
});