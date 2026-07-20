import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should produce correct string for complex with zero real part and positive imaginary", () => {
    // Test the specific path: a=0, b>0, no minus sign added
    // On original: else if (b < 0) doesn't fire for b=0.5
    // On mutated: else if (b <= 0) doesn't fire for b=0.5  
    // Both same - but let's try b approaching 0 from positive side
    const c = new Complex(0, Number.MIN_VALUE);
    // Number.MIN_VALUE = 5e-324, which is < EPSILON (1e-15)
    // So b becomes 0, early return fires: "0"
    expect(c.toString()).toBe("0");
  });
});