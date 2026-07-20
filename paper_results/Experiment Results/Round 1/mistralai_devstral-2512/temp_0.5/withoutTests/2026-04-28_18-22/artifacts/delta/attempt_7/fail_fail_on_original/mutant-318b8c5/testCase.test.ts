import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff with insert operations', () => {
  it('should correctly compute diff when other has insert with partial match', () => {
    const base = new Delta().insert('hello world');
    const other = new Delta().insert('hello there');
    const diff = base.diff(other);
    const expected = new Delta().retain(5).delete(6).insert(' there');
    expect(diff.ops).toEqual(expected.ops);
  });
});