import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('detects mutation when this starts with retain and other starts with longer plain retain', () => {
    // a: retain(2) then insert('Hello') 
    // b: retain(4) plain - covers retain(2) + part of insert
    // Original (=== insert): loop skips retain(2), main loop composes normally
    // Mutated (!== insert): loop copies retain(2) early, otherIter advances 2, changes composition
    const a = new Delta().retain(2).insert('Hello');
    const b = new Delta().retain(4).insert('!');
    // Original: retain(2) + insert('He') composed with retain(4), then insert('llo') + insert('!')
    const expected = new Delta().retain(2).insert('He!llo');
    expect(a.compose(b)).toEqual(expected);
  });
});