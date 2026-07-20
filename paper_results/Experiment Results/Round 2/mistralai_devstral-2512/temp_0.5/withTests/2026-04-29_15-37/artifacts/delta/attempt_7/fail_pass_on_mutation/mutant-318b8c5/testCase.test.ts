// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/delta/attempt_1/pending_category/mutant-318b8c5/testCase.test.ts
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert operation', () => {
  it('should correctly handle insert operations with specific length scenario', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('ABC');
    const result = a.diff(b);
    expect(result.ops[0].retain).toBe(1);
    expect(result.ops[1].insert).toBe('BC');
  });
});