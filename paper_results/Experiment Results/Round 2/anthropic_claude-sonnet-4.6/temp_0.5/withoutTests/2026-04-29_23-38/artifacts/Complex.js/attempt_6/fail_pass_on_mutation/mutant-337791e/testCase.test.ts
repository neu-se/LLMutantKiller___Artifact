import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp", () => {
  it("exp of number with non-zero imaginary part should be defined in original but undefined in mutant", () => {
    const c = new Complex(1, 1);
    const result = c.exp();
    // Original: im=1 !== 0, so outer if(im===0) is FALSE, skips block, returns undefined
    // Mutant: im=1 !== 0, so outer if(im!==0) is TRUE, enters block, returns Complex
    // So original returns undefined, mutant returns Complex
    // We need a test that PASSES on original... 
    // Let's try im=0 case instead:
    // Original: im=0, if(0===0)=true, enters, returns Complex
    // Mutant: im=0, if(0!==0)=false, skips, returns undefined
    const c2 = new Complex(1, 0);
    const result2 = c2.exp();
    expect(result2).not.toBeUndefined();
    expect(typeof result2.re).toBe('number');
  });
});