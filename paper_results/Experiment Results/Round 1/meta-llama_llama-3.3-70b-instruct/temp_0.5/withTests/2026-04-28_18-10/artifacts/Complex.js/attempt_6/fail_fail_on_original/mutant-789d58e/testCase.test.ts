import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.cos().sub(1);
    const expected = new Complex(Math.cos(0.1) - 1, 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});