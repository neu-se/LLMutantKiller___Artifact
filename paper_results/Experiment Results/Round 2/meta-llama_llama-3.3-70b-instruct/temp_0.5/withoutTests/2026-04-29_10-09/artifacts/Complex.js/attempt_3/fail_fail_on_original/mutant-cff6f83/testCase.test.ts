import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const originalResult = new Complex(0.48121182505960347, -0.8965753744041187);
    expect(result.equals(originalResult.re, originalResult.im)).toBe(true);
  });
});