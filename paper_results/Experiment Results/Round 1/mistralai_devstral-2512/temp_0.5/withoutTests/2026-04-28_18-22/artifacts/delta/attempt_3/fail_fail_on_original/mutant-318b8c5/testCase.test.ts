import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta diff with insert operations', () => {
  it('should correctly compute diff when other has multiple insert operations with varying lengths', () => {
    const base = new Delta().insert('abc').insert('def');
    const other = new Delta().insert('ab').insert('cde').insert('f');
    const diff = base.diff(other);
    const expected = new Delta()
      .retain(2)
      .delete(1)
      .insert('cde')
      .delete(1)
      .retain(1);
    expect(diff.ops).toEqual(expected.ops);
  });
});