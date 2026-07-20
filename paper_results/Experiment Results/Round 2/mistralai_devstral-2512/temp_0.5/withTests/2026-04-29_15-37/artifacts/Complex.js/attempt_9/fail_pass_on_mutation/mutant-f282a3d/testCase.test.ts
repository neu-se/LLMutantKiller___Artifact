// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f282a3d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with uppercase 'I' and reject invalid formats", () => {
    // Test valid uppercase 'I'
    const c1 = new Complex("3+2I");
    expect(c1.re).toBe(3);
    expect(c1.im).toBe(2);

    // Test that empty string after '+' is rejected
    // This will pass on original code (throws SyntaxError)
    // but fail on mutated code (incorrectly parses empty string as 'I')
    expect(() => new Complex("3+")).toThrow(SyntaxError);
  });
});