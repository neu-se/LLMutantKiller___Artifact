import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a complex number with a non-zero real part', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});