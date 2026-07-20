import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth(2+0i) should equal atanh(0.5) which is purely real", () => {
    // acoth(2) = atanh(1/2): d=4, new Complex(2/4, -0/4).atanh() = new Complex(0.5, 0).atanh()
    // atanh(0.5) ≈ 0.5493061443...
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});