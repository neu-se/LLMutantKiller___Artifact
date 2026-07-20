import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff with insert operations', () => {
  it('should correctly handle diff when other has longer insert with multiple components', () => {
    const base = new Delta().insert('a').insert('b');
    const other = new Delta().insert('abc');
    const diff = base.diff(other);
    const expected = new Delta().retain(1).delete(1).insert('abc');
    expect(diff.ops).toEqual(expected.ops);
  });
});