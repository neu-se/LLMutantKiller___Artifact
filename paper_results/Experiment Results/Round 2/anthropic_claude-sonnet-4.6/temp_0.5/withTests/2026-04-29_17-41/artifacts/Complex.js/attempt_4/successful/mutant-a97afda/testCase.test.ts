import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return correct value for atan(0 + 0i) = 0", () => {
    // For z = 0 + 0i: a=0, b=0
    // Original: if(b===1) is false, normal computation: d=1, result=(0,0)
    // Mutated: if(true) always runs the b===1 special case
    // The special case for b===1 likely returns Infinity or special value
    const result = new Complex(0, 0).atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});