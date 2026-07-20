import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('does not merge pre-populated insert ops when composing with plain retain', () => {
    const a = new Delta([{ insert: 'A' }, { insert: 'B' }]);
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }, { insert: 'B' }]);
  });
});