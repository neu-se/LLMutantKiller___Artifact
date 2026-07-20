// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly handle complex numbers with multiple operators before imaginary unit and reject invalid cases', () => {
    // This test should pass on original (throws error) but fail on mutated (doesn't throw)
    expect(() => {
      new Complex('+++i');
    }).toThrow(SyntaxError);
  });
});