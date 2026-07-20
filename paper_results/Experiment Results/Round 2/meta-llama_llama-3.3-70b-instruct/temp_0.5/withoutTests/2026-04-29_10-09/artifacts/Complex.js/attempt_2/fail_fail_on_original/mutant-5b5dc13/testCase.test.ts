import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for complex numbers', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(-0.48121182505960347, 10);
  });
});