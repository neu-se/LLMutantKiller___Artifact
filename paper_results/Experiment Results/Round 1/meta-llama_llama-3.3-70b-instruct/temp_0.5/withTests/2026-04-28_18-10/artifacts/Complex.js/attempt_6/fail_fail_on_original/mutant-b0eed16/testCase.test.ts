import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(1.0);
    expect(result.im).toBeCloseTo(0.0);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.sec();
    expect(result2.re).toBeCloseTo(0.5403023058681398);
    expect(result2.im).toBeCloseTo(-0.8414709848078965);
  });
});