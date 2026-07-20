// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-90b49f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with mixed operators", () => {
    // This test case targets the mutation by using a string with mixed operators
    // The original code checks if (plus + minus > 0) which should fail for unbalanced operators
    // The mutated code checks if (plus - minus > 0) which might not catch this case
    expect(() => new Complex("5-3i+")).toThrow(SyntaxError);
  });
});