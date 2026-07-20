import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex construction", () => {
  it("should parse a complex number from string after null construction", () => {
    // Test that parse function works correctly - the mutation affects
    // the null/undefined branch of parse, potentially leaving re unset
    const c1 = new Complex(null);
    const c2 = new Complex(undefined);
    
    // Both should be exactly zero
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(0);
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(0);
    
    // Test that a number added to null-constructed complex gives correct result
    expect(c1.add(5).re).toBe(5);
    expect(c1.add(5).im).toBe(0);
  });
});