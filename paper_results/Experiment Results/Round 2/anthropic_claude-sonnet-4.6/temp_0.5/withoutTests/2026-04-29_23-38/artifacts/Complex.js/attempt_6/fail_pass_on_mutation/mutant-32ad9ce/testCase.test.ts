import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse", () => {
  it("should not throw when only the real part is NaN (from abs/arg object with NaN abs)", () => {
    // Using {abs: NaN, arg: 0}: re = NaN*cos(0) = NaN, im = NaN*sin(0) = NaN
    // Both NaN - same for both versions
    
    // Using number NaN: z.re = NaN, z.im = 0
    // Original (||): true -> if block (with return z inside?) -> no throw
    // Mutated (&&): false -> skips if -> parser_exit -> throws
    
    // This test passes on original (no throw) and fails on mutant (throws)
    let result: InstanceType<typeof Complex>;
    expect(() => {
      result = new Complex(NaN);
    }).not.toThrow();
    
    expect(result!['re']).toBeNaN();
    expect(result!['im']).toBe(0);
  });
});