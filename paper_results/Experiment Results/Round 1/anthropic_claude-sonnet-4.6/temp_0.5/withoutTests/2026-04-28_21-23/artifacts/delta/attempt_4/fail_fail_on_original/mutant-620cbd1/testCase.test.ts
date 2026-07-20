import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose optimization with leading retain', () => {
    // Create a delta with multiple inserts of different types
    // that won't be merged by push
    const a = new Delta([
      { insert: 'hello' },
      { insert: ' ' },
      { insert: 'world' },
    ]);
    const b = new Delta().retain(5).insert('!');
    const composed = a.compose(b);
    expect(composed.ops).toEqual([{ insert: 'hello!' }]);
  });
});