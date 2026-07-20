import { Complex } from "../../../../complex";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493, 4);
    expect(result.im).toBeCloseTo(0, 4);
    const complex2 = new Complex(2, 0);
    const result2 = complex2.atanh();
    expect(result2.re).toBeCloseTo(0.5493, 4);
    expect(result2.im).toBeCloseTo(0, 4);
  });
});