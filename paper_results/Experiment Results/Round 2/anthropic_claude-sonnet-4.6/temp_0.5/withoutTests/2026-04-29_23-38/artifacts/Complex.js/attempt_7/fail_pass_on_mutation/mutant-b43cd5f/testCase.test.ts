import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should handle the case where the whitespace condition short-circuits correctly", () => {
    // The mutation changes || c === '\n' to || false
    // In JS regex, . does not match \n or \r
    // But \t IS matched by . and is handled in both original and mutated
    // The only detectable difference would be if somehow a \n token appears
    // Testing that tab-separated complex number parses correctly in both versions
    // and that the boolean short-circuit evaluation doesn't affect space/tab handling
    const withSpace = new Complex("5 + 3i");
    expect(withSpace.re).toBe(5);
    expect(withSpace.im).toBe(3);
    
    const withTab = new Complex("5\t+\t3i");
    expect(withTab.re).toBe(5);
    expect(withTab.im).toBe(3);
  });
});