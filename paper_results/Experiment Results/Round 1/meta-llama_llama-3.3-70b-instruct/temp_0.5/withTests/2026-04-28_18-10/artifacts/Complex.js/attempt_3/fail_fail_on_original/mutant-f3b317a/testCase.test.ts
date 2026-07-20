import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a complex number when asec is called with a non-zero value', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0.5235987755982989);
    expect(result.im).toBeCloseTo(0);
  });
});