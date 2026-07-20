import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("computes acot(1+2i) with correct imaginary part", () => {
    const result = new Complex(1, 2).acot();
    // acot(1+2i) = atan(1/(1+2i)) = atan((1-2i)/5) = atan(0.2 - 0.4i)
    // ≈ 0.2318 - 0.4024i
    // Mutation changes -b/d to +b/d, giving atan(0.2 + 0.4i) ≈ 0.2318 + 0.4024i
    expect(result.im).toBeCloseTo(-0.4024, 3);
  });
});