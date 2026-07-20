import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.5493061443340549, 10);
    expect(result.im).toBeCloseTo(-0.5493061443340549, 10);
  });
});