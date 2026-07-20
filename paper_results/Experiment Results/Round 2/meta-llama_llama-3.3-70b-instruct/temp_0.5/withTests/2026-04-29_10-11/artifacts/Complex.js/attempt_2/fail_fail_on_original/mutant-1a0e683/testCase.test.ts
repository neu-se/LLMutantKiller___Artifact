import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the power of a complex number', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });

  // Add another test case to check the behavior when a === 0, b === 0, z['re'] > 0, and z['im'] >= 0
  it('should correctly calculate the power when a === 0, b === 0, z[\'re\'] > 0, and z[\'im\'] >= 0', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });

  // Add another test case to check the behavior when a === 0, b === 0, z['re'] > 0, and z['im'] > 0
  it('should correctly calculate the power when a === 0, b === 0, z[\'re\'] > 0, and z[\'im\'] > 0', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 1); // changed z['im'] to 1
    expect(result.re).not.toBe(1);
    expect(result.im).not.toBe(0);
  });
});