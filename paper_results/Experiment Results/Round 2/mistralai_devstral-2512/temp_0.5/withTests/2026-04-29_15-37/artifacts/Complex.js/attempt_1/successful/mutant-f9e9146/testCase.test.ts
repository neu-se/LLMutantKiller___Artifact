// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f9e9146/testCase.test.ts
import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js __esModule property', () => {
  it('should have __esModule property set to true', () => {
    // This test checks if the __esModule property is correctly set to true
    // The mutation changes it to false, which should break ES module compatibility
    expect(Complex.__esModule).toBe(true);
  });
});