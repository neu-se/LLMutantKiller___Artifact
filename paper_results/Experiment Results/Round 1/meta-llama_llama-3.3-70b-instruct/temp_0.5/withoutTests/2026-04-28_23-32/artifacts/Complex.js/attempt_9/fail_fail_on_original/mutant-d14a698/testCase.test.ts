import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a complex number with a real part of 1 and an imaginary part of -1', () => {
    const complex = new Complex(1, -1);
    const result = complex.asec();
    expect(result.im).toBeLessThan(0);
  });
});