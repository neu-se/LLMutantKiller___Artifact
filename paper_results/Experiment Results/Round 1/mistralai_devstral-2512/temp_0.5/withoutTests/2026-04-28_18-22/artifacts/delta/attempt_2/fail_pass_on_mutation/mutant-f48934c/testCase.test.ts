// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/delta/attempt_1/pending_category/mutant-f48934c/testCase.test.ts
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta insert method', () => {
  it('should handle non-string object insertion without length property', () => {
    const delta = new Delta();
    const objWithoutLength = { key: 'value' };

    // This should work fine in the original code (no length check for objects)
    // but will fail in the mutated code because it tries to access arg.length
    // on an object that doesn't have a length property
    expect(() => {
      delta.insert(objWithoutLength);
    }).not.toThrow();

    // Verify the operation was successful
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].insert).toEqual(objWithoutLength);
  });
});