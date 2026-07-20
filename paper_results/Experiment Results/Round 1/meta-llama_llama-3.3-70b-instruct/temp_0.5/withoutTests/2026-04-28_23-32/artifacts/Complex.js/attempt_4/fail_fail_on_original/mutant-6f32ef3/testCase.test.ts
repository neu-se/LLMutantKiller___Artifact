import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle negative imaginary part in toString method', () => {
    const complex = new Complex(0, 0);
    expect(complex.toString()).toBe('0');
    const complex2 = new Complex(0, -0);
    expect(complex2.toString()).toBe('0');
  });
});