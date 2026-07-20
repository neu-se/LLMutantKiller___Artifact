import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    const originalResult = new Complex(0.5493061443340549, -0.5493061443340549);
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});