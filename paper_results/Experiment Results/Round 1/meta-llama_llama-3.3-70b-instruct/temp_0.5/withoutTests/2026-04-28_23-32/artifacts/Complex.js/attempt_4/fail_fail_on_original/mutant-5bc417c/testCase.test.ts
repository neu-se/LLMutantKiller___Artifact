import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acoth();
    expect(result2.re).toBeNaN();
    expect(result2.im).toBeNaN();
    const complex3 = new Complex(1, 0);
    const result3 = complex3.acoth();
    expect(result3.re).not.toBeNaN();
    expect(result3.im).not.toBeNaN();
  });
});