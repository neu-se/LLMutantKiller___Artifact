import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I", () => {
  it("should correctly parse a complex number string using uppercase I as imaginary unit", () => {
    // The mutation changes `c === 'i' || c === 'I'` to `c === 'i' || false`
    // This means uppercase 'I' will no longer be recognized as the imaginary unit
    // When 'I' is not recognized, parsing '2I' should throw or produce wrong result
    // In the original, 'I' alone means imaginary unit 1, so '2I' means 2i
    // With the mutation, 'I' is not recognized as imaginary, causing a SyntaxError
    expect(() => {
      const c = new Complex("2I");
      // If no error, verify the imaginary part is correct
      expect(c.im).toBe(2);
      expect(c.re).toBe(0);
    }).not.toThrow();
  });
});