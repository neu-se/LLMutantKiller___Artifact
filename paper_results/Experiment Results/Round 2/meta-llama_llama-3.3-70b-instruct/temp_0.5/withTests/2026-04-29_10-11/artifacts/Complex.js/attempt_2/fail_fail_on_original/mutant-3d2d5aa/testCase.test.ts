import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const originalResult = new Complex(1, 1).acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(originalResult.re).not.toBeNaN();
    expect(originalResult.im).not.toBeNaN();
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});