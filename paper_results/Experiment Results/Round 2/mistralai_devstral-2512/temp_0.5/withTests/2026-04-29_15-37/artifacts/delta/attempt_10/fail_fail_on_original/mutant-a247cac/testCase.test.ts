import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization with exact match', () => {
  it('should trigger retain end optimization when last op exactly matches newOp', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(3).delete(1);
    const result = a.compose(b);
    // The optimization should remove the trailing retain
    expect(result.ops).toHaveLength(3);
    expect(result.ops[2]).toEqual({ insert: 'C', attributes: { bold: true } });
  });
});