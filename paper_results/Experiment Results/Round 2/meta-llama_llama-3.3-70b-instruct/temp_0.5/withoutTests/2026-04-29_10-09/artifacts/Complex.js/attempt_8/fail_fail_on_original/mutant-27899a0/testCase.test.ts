import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a = -1', () => {
    const complex = new Complex(-1, 0);
    expect(complex.atanh().re).toBeCloseTo(Infinity, 15);
    expect(complex.atanh().im).toBeCloseTo(0, 15);
  });
});