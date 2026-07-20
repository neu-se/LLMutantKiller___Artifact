import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc non-zero real input", () => {
  it("acsc(2) should return asin(0.5) which has re=PI/6 and im=0", () => {
    // acsc(2) = asin(1/2) = PI/6
    // For a=2, b=0: d=4, computes new Complex(2/4, 0/4).asin() = new Complex(0.5, 0).asin()
    // asin(0.5) = PI/6 ≈ 0.5236
    const z = new Complex(2, 0);
    const result = (z as any).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});