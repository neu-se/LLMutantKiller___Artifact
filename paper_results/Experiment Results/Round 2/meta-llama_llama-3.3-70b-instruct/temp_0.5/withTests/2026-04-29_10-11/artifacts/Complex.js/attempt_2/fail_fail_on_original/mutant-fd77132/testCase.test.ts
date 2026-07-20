import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should calculate the arc secant of a complex number', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});