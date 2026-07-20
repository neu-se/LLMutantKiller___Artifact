import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.402298, 5);
    expect(result.im).toBeCloseTo(-0.402298, 5);
  });
});