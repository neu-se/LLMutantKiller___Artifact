import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the power when a === 0, b === 0, z[\'re\'] > 0, and z[\'im\'] >= 0', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
    const result2 = z.pow(1, -1); // changed z['im'] to -1
    expect(result2.re).toBe(1);
    expect(result2.im).toBe(0);
  });
});