import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.5, 1);
    expect(result.im).toBeCloseTo(-0.5, 1);
  });
});