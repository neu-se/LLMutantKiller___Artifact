import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsc', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0.5403023058681398);
    expect(result.im).toBeCloseTo(-0.8414709848078965);
  });
});