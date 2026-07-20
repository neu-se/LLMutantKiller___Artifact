import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('retain start optimization produces correct result when other has leading plain retain', () => {
    // 'a' starts with inserts, 'b' starts with a plain retain (no attributes)
    // The optimization pushes inserts from 'a' directly when they fit within the leading retain
    const a = new Delta().insert('Hello').retain(3);
    const b = new Delta().retain(5).insert('World');
    const expected = new Delta().insert('Hello').retain(3).insert('World');
    expect(a.compose(b)).toEqual(expected);
  });
});