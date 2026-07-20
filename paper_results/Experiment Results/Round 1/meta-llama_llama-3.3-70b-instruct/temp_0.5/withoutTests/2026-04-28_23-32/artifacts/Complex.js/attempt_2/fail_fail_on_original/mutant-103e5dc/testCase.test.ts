import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct cosecans value', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(0.5403023058681398);
    expect(result.im).toBeCloseTo(-0.8414709848078965);
  });
});