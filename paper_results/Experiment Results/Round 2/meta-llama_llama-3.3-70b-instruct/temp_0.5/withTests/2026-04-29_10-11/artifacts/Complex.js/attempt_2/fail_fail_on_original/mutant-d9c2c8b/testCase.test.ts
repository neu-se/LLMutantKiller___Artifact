import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const c = new Complex(1.5, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});