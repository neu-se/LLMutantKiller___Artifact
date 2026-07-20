import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});