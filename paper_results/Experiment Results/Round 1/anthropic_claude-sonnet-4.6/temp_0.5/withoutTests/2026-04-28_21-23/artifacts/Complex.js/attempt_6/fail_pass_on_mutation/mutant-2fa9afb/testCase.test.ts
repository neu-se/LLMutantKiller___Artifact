import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should compute (-1)^0.5 correctly as i", () => {
    // (-1)^0.5 = i, reaches the general pow path since base is negative real
    // a = -1, b = 0, z.re = 0.5, z.im = 0
    // Original: if(a===0 && b===0) is false, so computes correctly
    // Mutated: if(true) returns ZERO
    const result = new Complex(-1, 0).pow(new Complex(0.5, 0));
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});