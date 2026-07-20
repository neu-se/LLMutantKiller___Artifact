import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeCloseTo(-0.5493061443340549, 10);
    expect(result.im).toBeCloseTo(-0.5493061443340549, 10);
  });
});