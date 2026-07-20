import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(result.re).toBeCloseTo(0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});