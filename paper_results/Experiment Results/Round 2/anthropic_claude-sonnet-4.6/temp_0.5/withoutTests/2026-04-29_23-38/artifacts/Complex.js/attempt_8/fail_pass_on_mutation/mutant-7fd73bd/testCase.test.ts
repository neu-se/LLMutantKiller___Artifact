import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('expm1 composed with log should return original for positive real', () => {
    // Test log(1 + 2i) - uses logHypot and atan2
    // log(1+2i) = log(sqrt(5)) + i*atan(2)
    const z = new Complex(1, 2);
    const result = z.log();
    expect(result.re).toBeCloseTo(0.5 * Math.log(5), 10);
    expect(result.im).toBeCloseTo(Math.atan2(2, 1), 10);
  });
});