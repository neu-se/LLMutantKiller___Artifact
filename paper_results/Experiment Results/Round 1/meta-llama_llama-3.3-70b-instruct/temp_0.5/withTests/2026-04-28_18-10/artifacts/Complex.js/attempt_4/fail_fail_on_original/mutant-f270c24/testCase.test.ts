import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for b === 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Infinity);
  });
});