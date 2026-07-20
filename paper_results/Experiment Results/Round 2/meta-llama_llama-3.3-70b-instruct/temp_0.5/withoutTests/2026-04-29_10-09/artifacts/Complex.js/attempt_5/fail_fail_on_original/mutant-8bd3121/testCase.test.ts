import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.4828137236856465, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});