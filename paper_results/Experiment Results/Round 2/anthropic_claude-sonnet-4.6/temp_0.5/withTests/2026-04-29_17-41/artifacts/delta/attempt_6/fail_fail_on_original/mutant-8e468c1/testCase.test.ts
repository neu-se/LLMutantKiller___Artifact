import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization with retain ops', () => {
  it('should correctly compose when this starts with retain and other starts with plain retain', () => {
    // 'a' starts with a retain (not insert), then has an insert
    const a = new Delta().retain(2).insert('Hello');
    // 'b' starts with a plain retain covering the retain in 'a', then inserts 'X'
    const b = new Delta().retain(3).insert('X');
    // In original: loop condition `=== 'insert'` is false for retain, so no fast-path
    // In mutated: loop condition `!== 'insert'` is true for retain, incorrectly fast-paths
    const expected = new Delta().retain(2).insert('HelXlo');
    expect(a.compose(b)).toEqual(expected);
  });
});