import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result for acoth function', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acoth();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).toBeCloseTo(0, 10);
  });
});