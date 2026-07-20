import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acoth();
    expect(result2.re).toBeCloseTo(0.5);
  });
});