import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.toString()).not.toContain("NaN");
    expect(result.re).not.toBeCloseTo(0, 10);
  });
});