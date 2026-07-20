import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate atanh for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });

  it('should correctly calculate atanh for negative real numbers', () => {
    const complex = new Complex(-2, 0);
    const result = complex.atanh();
    expect(result.im).not.toBeCloseTo(0);
  });
});