import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh fallback mutation detection", () => {
  it("detects * vs / 0.5 mutation in sinh fallback by forcing fallback usage", () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    
    // Remove Math.sinh to force the fallback function to be captured on re-require
    const originalSinh = Math.sinh;
    // @ts-ignore
    delete Math.sinh;
    
    // Clear module cache so it re-evaluates with Math.sinh missing
    delete require.cache[modulePath];
    
    let FreshComplex: any;
    try {
      FreshComplex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    } finally {
      // Restore Math.sinh
      Math.sinh = originalSinh;
    }
    
    // Now the local sinh fallback was captured without Math.sinh
    // sinh(2): original = (e^2 - e^-2) * 0.5 ≈ 3.627, mutated = (e^2 - e^-2) / 0.5 ≈ 14.507
    const c = new FreshComplex(2, 0);
    const result = c.sinh();
    
    const expected = (Math.exp(2) - Math.exp(-2)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});