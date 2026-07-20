import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary unit", () => {
  it("should correctly parse a complex number with capital I as imaginary unit", () => {
    // In the original code, tokens[i+1] === 'I' is checked
    // In the mutated code, tokens[i+1] === "" is checked instead of 'I'
    // So parsing '3I' (with capital I) should treat 3 as imaginary in original,
    // but in mutated code it would treat 3 as real part
    const c = new Complex("3I");
    expect(c.re).toBe(0);
    expect(c.im).toBe(3);
  });
});