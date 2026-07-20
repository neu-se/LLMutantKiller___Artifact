import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0.46364760900080615, 5);
    expect(result.im).toBeCloseTo(-2.23606797749979, 5);
  });
});