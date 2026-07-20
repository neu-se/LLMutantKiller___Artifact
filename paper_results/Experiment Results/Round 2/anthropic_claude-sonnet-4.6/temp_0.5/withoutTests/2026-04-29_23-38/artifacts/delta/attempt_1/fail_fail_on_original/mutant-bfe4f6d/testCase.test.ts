import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('should handle composing with an empty other delta without throwing', () => {
    const delta = new Delta().insert('hello');
    const emptyOther = new Delta();
    // In the mutated code, firstOther is undefined, and `true &&` causes
    // `firstOther.retain` to throw a TypeError
    expect(() => delta.compose(emptyOther)).not.toThrow();
    const result = delta.compose(emptyOther);
    expect(result.ops).toEqual([{ insert: 'hello' }]);
  });
});