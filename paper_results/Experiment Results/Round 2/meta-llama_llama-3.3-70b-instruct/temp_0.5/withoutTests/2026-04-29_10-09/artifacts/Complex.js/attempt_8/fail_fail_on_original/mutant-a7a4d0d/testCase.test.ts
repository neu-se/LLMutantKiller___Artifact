import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific case', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    const expectedReal = Math.acosh(2);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(0);
  });
});