import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub", () => {
  it("finite minus Infinity should return Infinity in original but not in mutated", () => {
    // First if uses && (both infinite → NaN)
    // Original second if uses ||: one infinite → Infinity  
    // Mutated second if uses &&: one infinite → falls through → actual subtraction
    const finite = new Complex(3, 4);
    const result = finite.sub(Complex['INFINITY']);
    // Mutated: 3 - Infinity = -Infinity, 4 - Infinity = -Infinity → isInfinite? 
    // Actually new Complex(-Infinity, -Infinity).isInfinite() = true too
    // So let's check isNaN instead
    expect(result.isNaN()).toBe(false);
    expect(result.re).not.toBe(3 - Infinity); // mutated would compute actual subtraction
  });
});