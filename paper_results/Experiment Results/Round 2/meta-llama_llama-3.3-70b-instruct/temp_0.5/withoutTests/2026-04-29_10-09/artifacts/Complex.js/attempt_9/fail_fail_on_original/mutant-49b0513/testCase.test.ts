import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const temp = result.re;
    expect(temp).not.toBeNaN();
  });
});