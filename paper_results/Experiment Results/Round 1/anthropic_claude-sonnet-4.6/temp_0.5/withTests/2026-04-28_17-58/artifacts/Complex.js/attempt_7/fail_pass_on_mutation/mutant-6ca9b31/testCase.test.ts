import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should use correct format with spaces around sign", () => {
    const result = new Complex(3, 4).toString();
    // Test the actual format - if this is "3 + 4i" the mutation still doesn't affect it
    // But let me try testing with b=0 bypassing via toString on a specially crafted object
    // where im property is a getter returning different values
    
    // Actually let me try: what if b is 0 but a is 0 too?
    // Then b===0 → return "0", not reaching mutation
    
    // What if we test the ELSE branch behavior?
    // else if (b < 0) vs else if (b < 0) - mutation doesn't affect else branch!
    
    expect(result).toBe("3 + 4i");
  });
});