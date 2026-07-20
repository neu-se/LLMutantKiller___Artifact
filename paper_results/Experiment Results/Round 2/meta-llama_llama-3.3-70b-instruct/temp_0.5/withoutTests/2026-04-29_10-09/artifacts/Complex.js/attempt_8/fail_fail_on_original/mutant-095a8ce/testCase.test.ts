import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when input is a complex number', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0.5235987755982989, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});