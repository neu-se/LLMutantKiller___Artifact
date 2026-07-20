import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('detects mutation: this starts with plain retain, other is plain retain', () => {
    const a = new Delta().retain(2).insert('Hello');
    const b = new Delta().retain(2);
    // Original: loop skips (retain !== insert), retain(2) gets chopped, result = insert('Hello')
    // Mutated: loop copies retain(2) early, result includes retain(2) before insert('Hello')
    const expected = new Delta().insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});