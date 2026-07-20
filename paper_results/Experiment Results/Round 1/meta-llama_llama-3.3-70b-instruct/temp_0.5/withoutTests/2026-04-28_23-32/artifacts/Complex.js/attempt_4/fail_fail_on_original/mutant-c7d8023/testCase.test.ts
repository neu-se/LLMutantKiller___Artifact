import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch with b = 0', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrowError(SyntaxError);
  });

  it('should return the correct result for acsch with b != 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});