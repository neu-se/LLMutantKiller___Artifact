import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle negative imaginary part in toString method', () => {
    const complex = new Complex(0, 0);
    const complexStr = complex.toString();
    expect(complexStr).toBe('0');
    const complex2 = new Complex(0, -0);
    const complexStr2 = complex2.toString();
    expect(complexStr2).toBe('0');
  });
});