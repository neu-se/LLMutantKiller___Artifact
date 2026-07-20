import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a pure imaginary string correctly with im initialized to 0", () => {
    // In the mutated code, z[""] = void z['re'] = 0 means z['im'] is NOT reset
    // but z['im'] starts as 0 from the object literal anyway
    // The real difference: z['im'] = void 0 sets z['im'] to undefined in original!
    // Then += in the loop: undefined + number = NaN in original? No...
    // Actually z['im'] = (z['re'] = 0) sets z['im'] = 0
    // Mutated: z[""] = (z['re'] = 0) leaves z['im'] = 0 from literal
    // These are the same... need a different approach
    
    // Parse imaginary-only string
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
  });
});