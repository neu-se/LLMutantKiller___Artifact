import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate atanh for a = -1', () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    expect(() => result).not.toThrow();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0);
  });
});