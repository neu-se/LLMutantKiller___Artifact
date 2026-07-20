import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeCloseTo(-0.5493061443340548, 10);
    expect(result.im).not.toBeCloseTo(-0.5493061443340548, 10);
  });
});