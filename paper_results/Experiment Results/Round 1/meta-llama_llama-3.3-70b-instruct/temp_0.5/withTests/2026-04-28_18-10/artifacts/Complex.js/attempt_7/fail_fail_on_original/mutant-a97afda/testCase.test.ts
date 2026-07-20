import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct value for atan when a is 0 and b is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
    if (result.im === Infinity) {
      throw new Error("atan should not return Infinity for b = 1");
    }
  });
});