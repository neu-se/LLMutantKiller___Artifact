import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should throw when constructing from object where only one component is NaN", () => {
    // If parser_exit IS called (not commented) in original with ||:
    // new Complex({re: NaN, im: 0}) throws in original (isNaN(NaN)||isNaN(0) = true)
    // new Complex({re: NaN, im: 0}) does NOT throw in mutated (isNaN(NaN)&&isNaN(0) = false)
    let result: any;
    let threw = false;
    try {
      result = new Complex({ re: NaN, im: 0 });
    } catch(e) {
      threw = true;
    }
    // In original: threw=true
    // In mutated: threw=false, result has re=NaN, im=0
    // For the test to pass on original and fail on mutated:
    if (!threw) {
      // Mutated path: result exists with re=NaN, im=0
      // We need this to fail - assert something that's false in mutated
      expect(threw).toBe(true); // This fails in mutated
    }
    // Original path: threw=true, test passes
    expect(threw || !result).toBe(true);
  });
});