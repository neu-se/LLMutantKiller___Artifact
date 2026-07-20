import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff with insert operations', () => {
  it('should correctly compute diff when other has insert with exact length match', () => {
    const base = new Delta().insert('abc');
    const other = new Delta().insert('abd');
    const diff = base.diff(other);
    const expected = new Delta().retain(2).delete(1).insert('d');
    expect(diff.ops).toEqual(expected.ops);
  });
});