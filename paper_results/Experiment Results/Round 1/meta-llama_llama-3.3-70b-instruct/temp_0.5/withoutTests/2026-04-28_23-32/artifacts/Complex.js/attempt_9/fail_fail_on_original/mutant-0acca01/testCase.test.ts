import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.5493061443340549, 5);
    expect(result.im).toBeCloseTo(-0.5493061443340549, 5);
  });
});