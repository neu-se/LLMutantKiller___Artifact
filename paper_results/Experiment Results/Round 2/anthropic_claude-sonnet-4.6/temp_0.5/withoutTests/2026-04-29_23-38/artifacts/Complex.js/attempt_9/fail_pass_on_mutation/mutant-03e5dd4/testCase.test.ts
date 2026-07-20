import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline token detection", () => {
  it("should verify newline handling in tokenizer", () => {
    // Check if \n is actually captured by the regex in this JS engine
    const tokens = "3\n+4i".match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
    // If \n IS captured as a token, original skips it but mutated throws
    // If \n is NOT captured, both behave the same
    if (tokens && tokens.includes('\n')) {
      // \n is tokenized - original skips it, mutated throws
      const c = new Complex("3\n+4i");
      expect(c.re).toBe(3);
      expect(c.im).toBe(4);
    } else {
      // \n not tokenized - test multiline string behavior
      // Use String.fromCharCode(10) explicitly
      const newlineStr = "3" + String.fromCharCode(10) + "+4i";
      const c = new Complex(newlineStr);
      expect(c.re).toBe(3);
      expect(c.im).toBe(4);
    }
  });
});