// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/delta/attempt_1/pending_category/mutant-318b8c5/testCase.test.ts
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() with insert operation', () => {
  it('should correctly handle insert operations with length mismatch', () => {
    const a = new Delta().insert('AB');
    const b = new Delta().insert('ABC');
    const expected = new Delta().retain(2).insert('C');
    const result = a.diff(b);
    expect(result).toEqual(expected);
  });
});