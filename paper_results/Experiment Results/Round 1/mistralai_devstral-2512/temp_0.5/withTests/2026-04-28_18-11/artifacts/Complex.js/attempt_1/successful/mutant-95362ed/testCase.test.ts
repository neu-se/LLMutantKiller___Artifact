// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-95362ed/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should throw SyntaxError for invalid input type", () => {
    // This test targets the mutation where parser_exit() is removed from the default case
    // In the original code, passing a boolean should trigger the default case and throw
    // In the mutated code, the default case is empty, so it won't throw
    expect(() => {
      new Complex(true as any);
    }).toThrow(SyntaxError);
  });
});