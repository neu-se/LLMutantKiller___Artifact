import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(-0.48121182505960347);
    expect(result.im).toBeCloseTo(2.794513207646634);
  });
});