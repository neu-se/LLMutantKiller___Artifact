// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh()", () => {
  it("should not throw an error for non-zero inputs", () => {
    expect(() => {
      const result = new Complex(1, 1).sinh();
      expect(result.re).toBeDefined();
      expect(result.im).toBeDefined();
    }).not.toThrow();
  });
});