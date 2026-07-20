import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff with insert operations', () => {
  it('should correctly handle diff when other has insert with partial match at start', () => {
    const base = new Delta().insert('hello world');
    const other = new Delta().insert('hell');
    const diff = base.diff(other);
    const expected = new Delta().retain(4).delete(7);
    expect(diff.ops).toEqual(expected.ops);
  });
});