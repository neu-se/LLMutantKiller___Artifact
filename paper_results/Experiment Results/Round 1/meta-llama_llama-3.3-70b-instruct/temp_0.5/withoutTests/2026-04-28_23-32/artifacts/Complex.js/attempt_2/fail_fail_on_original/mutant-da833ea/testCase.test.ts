import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(-0.46364760900080615, 10);
    // Additional assertion to make the test fail on the mutated code
    expect(result.im).not.toBeCloseTo(-0.46364760900080615 * -0.5, 10);
  });
});