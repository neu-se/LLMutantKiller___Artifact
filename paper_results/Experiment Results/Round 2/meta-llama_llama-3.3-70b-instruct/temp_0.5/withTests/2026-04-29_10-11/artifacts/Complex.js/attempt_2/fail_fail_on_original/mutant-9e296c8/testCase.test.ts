import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly for the original code', () => {
    const complex = new Complex(1, 0);
    const result = complex.csch();
    expect(result.re).toBeCloseTo(-2, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});