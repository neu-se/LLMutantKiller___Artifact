import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should output correct string for number with zero real and zero imaginary after epsilon normalization", () => {
    // If b=0 somehow reaches else if (b<=0), mutated would give "-0i" instead of "0"
    const c = new Complex(0, 0);
    expect(c.toString()).not.toBe("-0i");
    expect(c.toString()).toBe("0");
  });
});