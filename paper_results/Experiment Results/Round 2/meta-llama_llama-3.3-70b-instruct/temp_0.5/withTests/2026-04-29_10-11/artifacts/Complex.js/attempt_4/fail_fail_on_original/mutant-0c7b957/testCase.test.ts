import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0);
  });
});