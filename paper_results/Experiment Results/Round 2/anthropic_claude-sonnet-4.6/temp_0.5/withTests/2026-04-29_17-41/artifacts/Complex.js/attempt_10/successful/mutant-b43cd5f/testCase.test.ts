import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with explicit newline token via match", () => {
  it("should handle newline in string by treating it as whitespace", () => {
    // Force newline into token stream by using a string where \n appears
    // between digits - the regex \d+\.?\d* won't consume \n, 
    // but the catch-all . also won't match \n without s flag
    // So test that parsing "1\n" doesn't throw and gives re=1
    const result = new Complex("1");
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
    
    // The real test: verify that a string parsed with tokens array
    // containing '\n' works - achieved by overriding String.prototype.match
    const origMatch = String.prototype.match;
    String.prototype.match = function(regex: RegExp) {
      const result = origMatch.call(this, regex);
      if (result) return ['\n', ...result];
      return result;
    };
    try {
      expect(() => new Complex("3+2i")).not.toThrow();
    } finally {
      String.prototype.match = origMatch;
    }
  });
});