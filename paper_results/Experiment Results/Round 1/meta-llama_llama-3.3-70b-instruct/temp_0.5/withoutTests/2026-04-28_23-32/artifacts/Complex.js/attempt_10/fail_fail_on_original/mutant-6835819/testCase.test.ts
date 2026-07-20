import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.9, 0.1);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(1.151292546497023, 10);
    expect(result.im).toBeCloseTo(-0.09966865249115645, 10);
  });
});