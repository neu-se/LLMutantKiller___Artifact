import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of a real number should return correct finite result", () => {
    // acoth(2) = atanh(1/2) ≈ 0.5493061443340548
    // Original: d = 2*2 + 0*0 = 4, d !== 0 is true, returns new Complex(2/4, 0).atanh()
    // Mutated: d is undefined (var d line removed), returns new Complex(2/undefined, 0).atanh() = NaN
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});