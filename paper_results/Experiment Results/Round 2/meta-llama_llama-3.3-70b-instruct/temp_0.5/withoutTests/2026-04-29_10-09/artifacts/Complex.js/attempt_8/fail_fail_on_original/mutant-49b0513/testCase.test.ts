import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    const temp = result.re;
    expect(temp).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});