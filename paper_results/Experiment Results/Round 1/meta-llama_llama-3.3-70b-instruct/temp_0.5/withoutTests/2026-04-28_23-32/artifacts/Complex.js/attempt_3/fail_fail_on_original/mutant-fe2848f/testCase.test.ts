import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0, 10);
  });
});