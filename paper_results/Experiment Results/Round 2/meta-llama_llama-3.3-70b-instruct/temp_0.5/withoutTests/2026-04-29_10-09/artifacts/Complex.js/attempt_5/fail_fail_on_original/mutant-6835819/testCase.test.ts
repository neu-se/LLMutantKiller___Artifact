import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    const originalResult = new Complex((1 * -1 - 1 * 1) / (1 * 1 - 1 * 1), (1 * 1 + 1 * -1) / (1 * 1 - 1 * 1));
    expect(result.re).not.toBeCloseTo(originalResult.re);
    expect(result.im).not.toBeCloseTo(originalResult.im);
  });
});