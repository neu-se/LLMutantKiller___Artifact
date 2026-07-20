import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(-0.5403023058681398, 10);
    expect(result.im).toBeCloseTo(0.4054651081081642, 10);
  });
});