import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    const expectedIm = -1 * (2 / (1 * 1 + 2 * 2));
    expect(result.im).toBeCloseTo(expectedIm);
  });
});