import { Complex } from "./complex";

describe('Complex', () => {
  it('should return a Complex object when atan is called with b equal to 1 and a equal to 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});