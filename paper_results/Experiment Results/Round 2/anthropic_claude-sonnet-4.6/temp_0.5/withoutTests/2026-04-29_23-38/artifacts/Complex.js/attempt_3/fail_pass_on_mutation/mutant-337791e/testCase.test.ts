import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp method", () => {
  it("should return a Complex object (not undefined) when imaginary part is zero", () => {
    // With original code (im === 0), the return statement executes
    // With mutated code (im !== 0), when im===0 the block is skipped and undefined is returned
    const c = new Complex(1, 0);
    const result = c.exp();
    
    expect(result).toBeDefined();
    expect(result).not.toBeUndefined();
    expect(result.re).toBeCloseTo(Math.E, 10);
    expect(result.im).toBe(0);
  });
});