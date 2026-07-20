// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/delta/attempt_1/pending_category/mutant-f48934c/testCase.test.ts
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta insert method', () => {
  it('should handle number insertion correctly', () => {
    const delta = new Delta();
    const numberValue = 42;

    // This should work fine in the original code (no length check for numbers)
    // but will fail in the mutated code because it tries to access arg.length
    // on a number which doesn't have a length property
    expect(() => {
      delta.insert(numberValue);
    }).not.toThrow();

    // Verify the operation was successful
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].insert).toBe(numberValue);
  });
});