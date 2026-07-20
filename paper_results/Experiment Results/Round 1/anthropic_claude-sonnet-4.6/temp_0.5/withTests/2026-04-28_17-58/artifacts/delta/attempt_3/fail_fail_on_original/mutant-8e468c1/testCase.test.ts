import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization with non-insert leading op', () => {
  it('should not copy leading retain ops when other starts with a plain retain', () => {
    // 'a' starts with a retain op (not insert), followed by an insert
    // 'b' starts with a plain retain covering the same range
    // Original: loop condition === 'insert' is false for retain, so no ops are copied early
    // Mutated: loop condition !== 'insert' is true for retain, incorrectly copies the retain
    const a = new Delta().retain(2).insert('Hello');
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().retain(2).insert('X').insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});