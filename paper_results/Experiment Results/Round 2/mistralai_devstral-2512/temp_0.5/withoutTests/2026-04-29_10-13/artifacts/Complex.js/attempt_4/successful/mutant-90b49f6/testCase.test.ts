// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-90b49f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with balanced plus and minus operators", () => {
    // This test case should pass on the original code but fail on the mutated code
    // The mutation changes the condition from `plus + minus > 0` to `plus - minus > 0`
    // When we have "1+2-3i-", the original code detects remaining operators (1+1=2>0)
    // but the mutated code would not (1-1=0), causing it to incorrectly accept the input
    expect(() => new Complex("1+2-3i-")).toThrow(SyntaxError);
  });
});