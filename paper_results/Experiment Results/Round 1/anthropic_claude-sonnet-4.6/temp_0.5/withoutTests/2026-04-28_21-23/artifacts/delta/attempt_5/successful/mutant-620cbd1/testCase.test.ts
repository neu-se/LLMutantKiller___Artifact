import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('merges inserts correctly when composing with a leading retain', () => {
    const a = new Delta([
      { insert: 'hello' },
      { insert: ' ' },
      { insert: 'world' },
    ]);
    const b = new Delta().retain(5);
    const composed = a.compose(b);
    expect(composed.ops).toEqual([{ insert: 'hello world' }]);
  });
});