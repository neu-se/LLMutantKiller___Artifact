import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate the natural log correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(-2, 0);
    const result2 = complex2.log();
    expect(result2.re).toBeCloseTo(Math.log(2));
    expect(result2.im).toBeCloseTo(Math.PI);
  });
});