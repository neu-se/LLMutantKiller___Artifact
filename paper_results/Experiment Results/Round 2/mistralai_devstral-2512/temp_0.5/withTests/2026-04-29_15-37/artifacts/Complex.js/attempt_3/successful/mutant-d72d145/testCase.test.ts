import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc() mutation test", () => {
  it("should correctly handle division in acsc calculation", () => {
    // Test case where a/a would produce different result than a*a
    // When a=0, original d=0+0=0, mutated d=NaN+0=NaN
    // This should trigger different behavior in the subsequent logic
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The mutation would cause d to be NaN when a=0, leading to different behavior
    expect(result.isNaN()).toBe(false);
    // Verify the actual values are reasonable
    expect(Math.abs(result.re)).toBeLessThan(1000);
    expect(Math.abs(result.im)).toBeLessThan(1000);
  });
});