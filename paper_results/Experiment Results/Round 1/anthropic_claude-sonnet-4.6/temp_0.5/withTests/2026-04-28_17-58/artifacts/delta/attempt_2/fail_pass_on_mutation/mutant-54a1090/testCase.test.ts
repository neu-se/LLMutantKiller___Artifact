import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization correctly handles inserts when other starts with plain retain', () => {
    // This test exercises the "retain start optimization" in compose().
    // The original code has a condition: thisIter.peekType() === 'insert' && thisIter.peekLength() <= firstLeft
    // which allows insert ops from `this` that fit within the initial plain retain of `other`
    // to be pushed directly. The mutation replaces this with `false`, breaking this optimization.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});