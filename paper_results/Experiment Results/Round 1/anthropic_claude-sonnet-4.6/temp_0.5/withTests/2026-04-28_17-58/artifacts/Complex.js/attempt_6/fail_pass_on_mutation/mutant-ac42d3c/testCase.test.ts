import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan of pure imaginary -2i should give correct result", () => {
    // For a=0, b=-2 (not -1), both original and mutant use the same computation path
    // For a=0, b=-1, original returns early with Complex(0,-Infinity)
    // Testing that the atan function handles the a===0 branch correctly
    const result = new Complex(0, -1).atan();
    // The key: in original code returns Complex(0, -Infinity)
    // In mutant: computes through, d=4, t1=Complex(0,0).log()=Complex(-Inf,0)
    // result = Complex(-0.5*0, 0.5*-Inf) = Complex(-0, -Inf)
    // Use 1/result.re to distinguish +0 from -0
    expect(1 / result.re).toBe(Infinity);
  });
});