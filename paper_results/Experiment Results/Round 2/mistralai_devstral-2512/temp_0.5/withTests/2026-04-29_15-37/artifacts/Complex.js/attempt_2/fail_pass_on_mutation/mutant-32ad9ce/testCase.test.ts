// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with NaN values', () => {
  it('should handle a single NaN component by creating a NaN complex number', () => {
    const result = new Complex({ re: NaN, im: 0 });
    expect(result.isNaN()).toBe(true);
  });
});