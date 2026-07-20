import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a = 1.5 and b = 0', () => {
    const c = new Complex(1.5, 0);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(0);
  });
});