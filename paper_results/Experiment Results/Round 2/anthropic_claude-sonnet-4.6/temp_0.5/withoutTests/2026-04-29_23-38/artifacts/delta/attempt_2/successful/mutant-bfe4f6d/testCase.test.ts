import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('should correctly compose a delta with an empty other delta without throwing', () => {
    const delta = new Delta().insert('hello');
    const emptyOther = new Delta();
    // In the mutated code, firstOther is undefined, and `true &&` causes
    // `firstOther.retain` to throw a TypeError since firstOther is undefined
    const result = delta.compose(emptyOther);
    expect(result.ops).toEqual([{ insert: 'hello' }]);
  });
});