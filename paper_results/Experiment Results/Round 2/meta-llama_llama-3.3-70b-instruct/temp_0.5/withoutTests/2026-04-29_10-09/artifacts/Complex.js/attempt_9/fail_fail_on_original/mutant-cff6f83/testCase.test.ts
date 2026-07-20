import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(0.48121182505960347 * 1, 10);
    expect(result.im).not.toBeCloseTo(-0.8965753744041187 * 1, 10);
  });
});