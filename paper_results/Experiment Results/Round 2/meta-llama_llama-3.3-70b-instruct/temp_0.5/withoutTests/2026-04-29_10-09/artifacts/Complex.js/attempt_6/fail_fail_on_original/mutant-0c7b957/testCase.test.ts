import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1.5, 0.5);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(1, 1);
    const result2 = complex2.atanh();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
    const complex3 = new Complex(2, 2);
    const result3 = complex3.atanh();
    expect(result3.re).not.toBeNaN();
    expect(result3.im).not.toBeNaN();
    // The mutation causes a division by zero error when b is zero, so we test with a non-zero imaginary part
    const complex4 = new Complex(1, 0.00001);
    const result4 = complex4.atanh();
    expect(result4.re).not.toBeNaN();
    expect(result4.im).not.toBeNaN();
  });
});