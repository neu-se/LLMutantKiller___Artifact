import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(1, 2);
    const resultOriginal = new Complex(-0.48121182505960347, -0.8964765786616346);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(resultOriginal.re, 5);
    expect(result.im).toBeCloseTo(resultOriginal.im, 5);
  });
});