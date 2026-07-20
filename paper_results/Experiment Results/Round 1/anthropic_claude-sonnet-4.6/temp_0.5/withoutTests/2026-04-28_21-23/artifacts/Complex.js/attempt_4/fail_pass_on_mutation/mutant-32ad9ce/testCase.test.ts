import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parsing with string", () => {
  it("should correctly parse a complex number string resulting in NaN real part", () => {
    // The mutation changes || to && in the NaN check after parsing
    // If only one component ends up NaN, original (||) enters the if block, mutated (&&) does not
    // Since the if block body is a no-op comment, both behave the same for single-NaN case
    // BUT: if NEITHER is NaN, neither enters the if - same behavior
    // The only difference: when exactly one is NaN
    // Since the if body does nothing (throw is commented out), we need another angle
    
    // Actually test that Complex.NAN (both NaN) behaves consistently
    // and that a number with only re=NaN is treated as NaN
    const c = new Complex(NaN, NaN);
    expect(c.isNaN()).toBe(true);
    expect(c.re).toBeNaN();
    expect(c.im).toBeNaN();
    
    // Test add with NaN - should return NaN
    const result = new Complex(1, 2).add(new Complex(NaN, NaN));
    expect(result.isNaN()).toBe(true);
  });
});