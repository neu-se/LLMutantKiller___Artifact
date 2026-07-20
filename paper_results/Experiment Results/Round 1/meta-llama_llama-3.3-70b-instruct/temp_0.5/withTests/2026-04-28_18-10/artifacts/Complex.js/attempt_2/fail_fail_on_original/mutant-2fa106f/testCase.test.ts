import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle atan with b equal to 1 and a equal to 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});