// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/delta/attempt_1/pending_category/mutant-f48934c/testCase.test.ts
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta insert method', () => {
  it('should handle null insertion correctly', () => {
    const delta = new Delta();

    // This should work fine in the original code (no length check for null)
    // but will fail in the mutated code because it tries to access arg.length
    // on null which will throw an error
    expect(() => {
      delta.insert(null as any);
    }).not.toThrow();

    // Verify the operation was successful
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].insert).toBeNull();
  });
});