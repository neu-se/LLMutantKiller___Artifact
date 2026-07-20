import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing newline token test", () => {
  it("should verify newline handling in string parser", () => {
    // Check if '\n' appears as a token in the regex
    const str = "3\n+4i";
    const tokens = str.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
    
    // In Node.js, '.' without 's' flag does NOT match '\n'
    // So tokens should be ["3", "+", "4", "i"]
    expect(tokens).toEqual(["3", "+", "4", "i"]);
    
    // This means the mutation has no observable effect on string parsing
    // Both versions produce the same result for any string input
    const c = new Complex(str);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});