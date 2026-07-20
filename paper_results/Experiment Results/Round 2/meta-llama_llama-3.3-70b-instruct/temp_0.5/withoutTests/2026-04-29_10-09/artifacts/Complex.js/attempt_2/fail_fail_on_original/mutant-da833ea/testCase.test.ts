import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.asech();
    expect(result.re).not.toBeCloseTo(1.3169578969248166 * -0.5 * 0.5);
    expect(result.im).not.toBeCloseTo(0.46364760900080615 * -0.5 * 0.5);
  });
});