// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/delta/attempt_1/pending_category/mutant-f48934c/testCase.test.ts
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta insert method', () => {
  it('should handle empty string insertion correctly', () => {
    const delta = new Delta();
    // This should not throw an error in the original code
    // but will throw in the mutated code because it tries to access
    // arg.length without checking if arg is a string first
    expect(() => {
      delta.insert('');
    }).not.toThrow();

    // Verify the delta remains unchanged (empty string should not be added)
    expect(delta.ops).toEqual([]);
  });
});