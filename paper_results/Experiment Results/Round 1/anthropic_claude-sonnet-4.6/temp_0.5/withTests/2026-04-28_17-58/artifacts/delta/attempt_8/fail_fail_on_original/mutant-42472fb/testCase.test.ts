import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly handles partial retain when inserts are shorter than initial retain', () => {
    // a: insert 'AB' (2 chars), then retain(3)
    // b: retain(5) with no attributes - plain retain covering inserts + retained portion
    // Original: moves 'AB' to ops, advances otherIter by 2, leaving retain(3) in otherIter
    // Mutated: retain(5) stays in otherIter, gets processed against insert('AB') in main loop
    const a = new Delta()
      .insert('AB')
      .retain(3);
    const b = new Delta()
      .retain(2)
      .insert('X')
      .retain(3);
    const expected = new Delta()
      .insert('AB')
      .insert('X')
      .retain(3);
    expect(a.compose(b)).toEqual(expected);
  });
});