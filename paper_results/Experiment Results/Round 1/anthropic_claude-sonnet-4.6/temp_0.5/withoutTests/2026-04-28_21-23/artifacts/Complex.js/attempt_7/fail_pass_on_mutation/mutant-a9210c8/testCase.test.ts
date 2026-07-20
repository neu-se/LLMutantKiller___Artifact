import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("asinh should correctly handle complex numbers", () => {
    // asinh(1+i) should give a specific complex result
    const z = new Complex(1, 1);
    const result = z.asinh();
    
    // Known value: asinh(1+i) ≈ 1.0612 + 0.6662i
    expect(result.re).toBeCloseTo(1.0612750619050357, 5);
    expect(result.im).toBeCloseTo(0.6662394324925153, 5);
  });
});