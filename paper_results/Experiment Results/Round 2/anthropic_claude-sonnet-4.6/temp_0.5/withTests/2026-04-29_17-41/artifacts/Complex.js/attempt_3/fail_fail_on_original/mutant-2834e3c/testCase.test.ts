import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("detects mutation via floating point underflow in asech", () => {
    const tiny = 5e-200;
    const d = tiny * tiny + tiny * tiny;
    
    // Only run this test if d actually underflows to 0
    if (d !== 0) {
      // If no underflow, skip (but this shouldn't happen with IEEE 754)
      expect(true).toBe(true);
      return;
    }
    
    const z = new Complex(tiny, tiny);
    expect(z.isZero()).toBe(false);
    
    const result = z.asech();
    expect(result.re).toBe(Infinity);
  });
});