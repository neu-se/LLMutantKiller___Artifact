import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    const complex = new Complex(1.1, 0);
    const result = complex.atanh();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(0);
  });
});