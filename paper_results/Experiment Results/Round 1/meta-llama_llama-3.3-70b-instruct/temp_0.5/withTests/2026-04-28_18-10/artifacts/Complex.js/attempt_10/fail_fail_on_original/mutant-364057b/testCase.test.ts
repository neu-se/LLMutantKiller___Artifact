import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly handle asech for a = 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(Infinity, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0, 0);
    expect(() => complex2.asech()).toThrow();
  });
});