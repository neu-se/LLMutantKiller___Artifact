import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    const a = 1;
    const b = 2;
    const d = a * a + b * b;
    expect(result.im).not.toBeCloseTo(-b * d);
  });
});