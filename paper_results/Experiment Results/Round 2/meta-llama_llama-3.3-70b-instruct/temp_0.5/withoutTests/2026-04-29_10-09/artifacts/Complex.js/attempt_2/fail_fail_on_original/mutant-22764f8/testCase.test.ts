import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});