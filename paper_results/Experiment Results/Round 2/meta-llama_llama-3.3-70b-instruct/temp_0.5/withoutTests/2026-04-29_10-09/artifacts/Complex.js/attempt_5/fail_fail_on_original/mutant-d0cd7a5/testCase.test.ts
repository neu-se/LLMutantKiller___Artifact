import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    const expected = new Complex(-0.48121182505960347, -0.8964765786616346);
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
  });
});