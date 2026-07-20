import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.5403023058681398);
    expect(result.im).toBeCloseTo(-0.8414709848078965);
  });
});