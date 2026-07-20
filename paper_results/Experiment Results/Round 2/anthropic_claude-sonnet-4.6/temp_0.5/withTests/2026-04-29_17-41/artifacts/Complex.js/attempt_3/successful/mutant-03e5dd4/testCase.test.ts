import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing newline handling", () => {
  it("should treat newline character as whitespace when it appears as a token", () => {
    const originalMatch = String.prototype.match;
    
    // Temporarily override match to inject '\n' as a token between number and operator
    (String.prototype as any).match = function(this: string, regex: RegExp | string) {
      if (typeof regex === 'object' && regex.toString().includes('\\d') && this === '3+4i_with_newline') {
        return ['3', '\n', '+', '4', 'i'];
      }
      return originalMatch.call(this, regex);
    };
    
    try {
      // Original: '\n' is whitespace → skip → re=3, im=4
      // Mutated: '\n' not whitespace → plus+minus=0 → throws SyntaxError
      const c = new Complex('3+4i_with_newline');
      expect(c.re).toBe(3);
      expect(c.im).toBe(4);
    } finally {
      String.prototype.match = originalMatch;
    }
  });
});