import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff with insert operations', () => {
  it('should correctly compute diff when other has insert with exact length but different content', () => {
    const base = new Delta().insert('abc');
    const other = new Delta().insert('xyz');
    const diff = base.diff(other);
    const expected = new Delta().delete(3).insert('xyz');
    expect(diff.ops).toEqual(expected.ops);
  });
});