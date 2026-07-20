import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a complex number', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.316, 3);
    expect(result.im).toBeCloseTo(0, 3);
  });
});