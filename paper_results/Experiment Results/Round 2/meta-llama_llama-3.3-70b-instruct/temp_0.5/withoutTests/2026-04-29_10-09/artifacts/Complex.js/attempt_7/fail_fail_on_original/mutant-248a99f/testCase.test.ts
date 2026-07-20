import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle division by zero or infinity', () => {
    const complex = new Complex(0, 0);
    const result = complex.div(1, 1);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.div(0, 0);
    expect(result2.isNaN()).toBe(true);
    const complex3 = new Complex(0, 0);
    const result3 = complex3.div(0, 0);
    expect(result3.isNaN()).toBe(true);
  });
});