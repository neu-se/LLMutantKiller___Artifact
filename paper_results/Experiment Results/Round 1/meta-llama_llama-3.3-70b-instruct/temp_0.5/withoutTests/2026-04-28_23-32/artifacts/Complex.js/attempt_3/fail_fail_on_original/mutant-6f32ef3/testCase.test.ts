import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle negative imaginary part in toString method', () => {
    const complex = new Complex(1, -1);
    const complexStr = complex.toString();
    expect(complexStr).toBe('1 - 1i');
    const complex2 = new Complex(1, 0);
    const complexStr2 = complex2.toString();
    expect(complexStr2).toBe('1');
    const complex3 = new Complex(0, 0);
    const complexStr3 = complex3.toString();
    expect(complexStr3).toBe('0');
    const complex4 = new Complex(0, -0);
    const complexStr4 = complex4.toString();
    expect(complexStr4).toBe('0');
  });
});