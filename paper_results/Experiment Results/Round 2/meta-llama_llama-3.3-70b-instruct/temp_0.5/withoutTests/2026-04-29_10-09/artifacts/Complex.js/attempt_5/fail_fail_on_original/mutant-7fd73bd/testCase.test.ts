import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly handle log function for complex numbers', () => {
    const complex = new Complex(0, 1);
    const logResult = complex.log();
    expect(logResult.re).toBeCloseTo(0, 5);
    expect(logResult.im).toBeCloseTo(Math.PI / 2, 5);
    const complex2 = new Complex(1, 0);
    const logResult2 = complex2.log();
    expect(logResult2.re).toBeCloseTo(0, 5);
    expect(logResult2.im).toBeCloseTo(0, 5);
    const complex3 = new Complex(-1, 0);
    const logResult3 = complex3.log();
    expect(logResult3.re).not.toBeCloseTo(0, 5);
  });
});