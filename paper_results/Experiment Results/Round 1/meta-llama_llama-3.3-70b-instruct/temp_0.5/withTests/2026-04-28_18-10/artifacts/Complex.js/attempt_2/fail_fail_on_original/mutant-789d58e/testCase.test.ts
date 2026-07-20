import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly for small values', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    expect(result.re).toBeCloseTo(-0.5 * x * x, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});