import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const expectedRealPart = 0.48121182505960347;
    const expectedImaginaryPart = -0.8965753744041187;
    expect(result.re).toBeCloseTo(expectedRealPart, 10);
    expect(result.im).toBeCloseTo(expectedImaginaryPart, 10);
  });
});