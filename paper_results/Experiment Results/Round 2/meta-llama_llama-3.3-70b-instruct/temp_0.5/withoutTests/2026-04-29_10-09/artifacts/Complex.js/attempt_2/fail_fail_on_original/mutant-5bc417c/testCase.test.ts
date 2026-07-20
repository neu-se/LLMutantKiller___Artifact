import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for complex numbers', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(-0.5493061443340549);
  });
});