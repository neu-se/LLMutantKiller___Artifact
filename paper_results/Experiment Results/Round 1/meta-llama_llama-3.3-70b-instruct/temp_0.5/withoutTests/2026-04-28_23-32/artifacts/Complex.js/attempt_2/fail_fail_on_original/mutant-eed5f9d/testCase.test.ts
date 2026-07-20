import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});