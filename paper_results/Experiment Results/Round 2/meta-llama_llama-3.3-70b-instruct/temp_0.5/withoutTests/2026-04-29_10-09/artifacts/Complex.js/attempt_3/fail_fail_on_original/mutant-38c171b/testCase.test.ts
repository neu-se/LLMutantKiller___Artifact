import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 15);
    expect(result.im).toBeCloseTo(-Infinity, 15);
  });
});