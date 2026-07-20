// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with NaN values', () => {
  it('should treat a single NaN component as invalid and throw SyntaxError', () => {
    // This test targets the mutation where the condition changed from OR to AND
    // In the original code, either re or im being NaN would trigger the error
    // In the mutated code, both need to be NaN to trigger the error
    expect(() => {
      new Complex({ re: NaN, im: 0 });
    }).toThrow(SyntaxError);
  });
});