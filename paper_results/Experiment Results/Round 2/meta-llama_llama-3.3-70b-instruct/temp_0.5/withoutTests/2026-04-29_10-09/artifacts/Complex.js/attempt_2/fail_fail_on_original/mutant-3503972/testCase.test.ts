import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});