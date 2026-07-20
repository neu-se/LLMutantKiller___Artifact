import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta diff with insert operations', () => {
  it('should correctly compute diff when other has longer insert than length', () => {
    const base = new Delta().insert('hello');
    const other = new Delta().insert('hello world');
    const diff = base.diff(other);
    const expected = new Delta().retain(5).insert(' world');
    expect(diff.ops).toEqual(expected.ops);
  });
});