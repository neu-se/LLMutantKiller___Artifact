import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute asinh of a complex number", () => {
    // asinh(1 + i) should return a specific complex value
    // The mutation changes this['im'] = tmp to this[""] = tmp
    // which means the imaginary part of 'this' won't be restored properly
    // This affects the internal state during computation
    
    const z = new Complex(1, 1);
    const result = z.asinh();
    
    // Known value: asinh(1 + i) ≈ 1.0612750619... + 0.6662394324...i
    const expectedRe = 1.0612750619050357;
    const expectedIm = 0.6662394324925153;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});