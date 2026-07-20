import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate sinh correctly', () => {
    const complex = new Complex(0, 0);
    const sinh = complex.sinh();
    expect(sinh.re).toBeCloseTo(0);
    expect(sinh.im).toBeCloseTo(0);
  });
});