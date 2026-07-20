import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle division by zero or infinity', () => {
    const complex = new Complex(1, 1);
    const result = complex.div(0, 0);
    expect(result.equals(Complex['NAN'])).toBe(true);
  });
});