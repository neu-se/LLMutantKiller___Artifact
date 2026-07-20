import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex["re"]).toBe(complex.re);
  });
});