import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(-0.8965753744041187, 10);
  });
});