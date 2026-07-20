import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should correctly compute atan for a real number where imaginary part is not 1", () => {
    // atan(1 + 0i) should be π/4 + 0i
    const result = new Complex(1, 0).atan();
    
    // With original code: b = 0, so if(b === 1) is false, normal computation proceeds
    // With mutated code: if(true) always executes the b===1 special case branch
    // which would produce incorrect results for b !== 1
    
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});