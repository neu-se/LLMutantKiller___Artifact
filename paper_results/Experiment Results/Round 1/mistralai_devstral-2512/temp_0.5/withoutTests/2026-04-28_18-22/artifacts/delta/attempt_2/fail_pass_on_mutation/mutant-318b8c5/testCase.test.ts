import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta diff with insert operations', () => {
  it('should correctly handle diff when other has shorter insert than length', () => {
    const base = new Delta().insert('hello world');
    const other = new Delta().insert('hello');
    const diff = base.diff(other);
    const expected = new Delta().retain(5).delete(6);
    expect(diff.ops).toEqual(expected.ops);
  });
});