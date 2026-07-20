import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0);
  });
});