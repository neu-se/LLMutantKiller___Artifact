import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a complex number from string with both real and imaginary parts", () => {
    // Test that re is properly 0 when only imaginary part exists
    // and that parsing accumulates correctly
    const c1 = new Complex("i");
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(1);
    
    // Test that a real-only string works
    const c2 = new Complex("42");
    expect(c2.re).toBe(42);
    expect(c2.im).toBe(0);
    
    // Test full complex
    const c3 = new Complex("3+4i");
    expect(c3.re).toBe(3);
    expect(c3.im).toBe(4);
    
    // Test that the parsed value equals what we'd construct directly
    expect(c3.equals(new Complex(3, 4))).toBe(true);
    
    // Test operations on string-parsed complex numbers
    const sum = c1.add(c2);
    expect(sum.re).toBe(42);
    expect(sum.im).toBe(1);
  });
});