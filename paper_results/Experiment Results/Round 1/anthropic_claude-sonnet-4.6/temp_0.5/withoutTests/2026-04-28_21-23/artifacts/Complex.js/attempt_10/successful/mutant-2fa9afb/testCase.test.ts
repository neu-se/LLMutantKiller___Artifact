import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(2) should return arcsin(1/2) = π/6", () => {
    // acsc(2) = asin(1/2) = π/6 ≈ 0.5236
    // With mutation if(true), acsc always returns Complex(0, Infinity)
    const result = new Complex(2, 0).acsc();
    
    expect(result.re).toBeCloseTo(Math.PI / 6, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});