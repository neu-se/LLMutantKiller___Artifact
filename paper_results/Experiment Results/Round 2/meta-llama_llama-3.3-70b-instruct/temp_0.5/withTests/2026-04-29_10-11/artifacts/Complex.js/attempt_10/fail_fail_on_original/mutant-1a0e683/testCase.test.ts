import { Complex } from "../complex";

describe('Complex', () => {
  it('should correctly calculate the power when a === 0, b === 0, z[\'re\'] > 0, and z[\'im\'] >= 0', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
    const z2 = new Complex(1, 0);
    const result2 = z2.pow(0, 0);
    expect(result2.re).toBe(1);
    expect(result2.im).toBe(0);
    const z3 = new Complex(0, 0);
    const result3 = z3.pow(1, 0); 
    expect(result3.re).toBe(1);
    expect(result3.im).toBe(0);
    const z4 = new Complex(0, 0);
    const result4 = z4.pow(1, 0); 
    expect(result4.re).toBe(1);
    expect(result4.im).toBe(0);
    const z5 = new Complex(1, 0);
    const result5 = z5.pow(0, 0); 
    expect(result5.re).toBe(1);
    expect(result5.im).toBe(0);
    const z6 = new Complex(1, 0);
    const result6 = z6.pow(1, -1); 
    expect(result6.re).toBeCloseTo(1);
    expect(result6.im).toBeCloseTo(0);
    const z7 = new Complex(0, 0);
    const result7 = z7.pow(1, 0); 
    expect(result7.re).toBe(1);
    expect(result7.im).toBe(0);
  });
});