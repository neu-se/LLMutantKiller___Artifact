import Delta from "../../../../subject_repositories/delta/src/Delta";

describe('Delta compose optimization', () => {
  it('should correctly compose when other ends with a retain and this has remaining ops', () => {
    // this has: insert "hello", insert " world"
    // other has: retain 5 (covers "hello")
    // After processing retain 5, otherIter is exhausted
    // The optimization should concat the remaining " world" insert
    const a = new Delta().insert('hello').insert(' world');
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'hello world' }]);
  });
});