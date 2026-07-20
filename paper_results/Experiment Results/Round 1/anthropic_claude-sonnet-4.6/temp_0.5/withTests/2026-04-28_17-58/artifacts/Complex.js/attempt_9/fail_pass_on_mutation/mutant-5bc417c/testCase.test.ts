import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of complex number with nonzero imaginary part returns correct value not (0, PI/2)", () => {
    // acoth(0 + 2i) - purely imaginary input
    // Original result should have specific re and im values
    // If mutated if(true) always returns (0, PI/2), im would be PI/2
    const result = new Complex(0, 2).acoth();
    // acoth(2i) = atanh(-i/2) which has im = -atan(1/2) ≈ -0.4636...
    expect(result.im).not.toBeCloseTo(Math.PI / 2, 5);
  });
});