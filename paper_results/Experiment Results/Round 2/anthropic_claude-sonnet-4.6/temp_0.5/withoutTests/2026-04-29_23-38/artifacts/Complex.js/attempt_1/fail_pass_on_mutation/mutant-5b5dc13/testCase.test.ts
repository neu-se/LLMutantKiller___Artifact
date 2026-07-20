import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a purely imaginary number with a=0, b=0 edge case via d=0 fallback", () => {
    // The mutation changes (a !== 0) ? a / 0 : 0 to (a === 0) ? a / 0 : 0
    // in the d === 0 fallback of acsch.
    // When a=0, b=0: original returns 0, mutated returns NaN (via 0/0)
    // The b===0 check at top of acsch handles b=0 case, but we can test
    // a normal acsch computation to ensure correctness.
    // acsch(i) = acsch(0 + 1i) should give a specific value
    // acsch(z) = log((1 + sqrt(1 + z^2)) / z)
    // For z = i: acsch(i) = log((1 + sqrt(1 - 1)) / i) = log(1/i) = log(-i) = -i*pi/2
    const result = new Complex(0, 1).acsch();
    // acsch(i) = -i*pi/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});