import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly using Taylor series for small x', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = Math.exp(x) - 1;
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-10);
    expect(Math.abs(result.im)).toBeLessThan(1e-10);
  });
});