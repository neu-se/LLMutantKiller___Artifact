import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization with exact conditions', () => {
  it('should handle the specific case where optimization triggers array bounds check', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    // The mutation changes delta.ops.length - 1 to +1, which would cause an out-of-bounds access
    // This test verifies the optimization works correctly without throwing errors
    expect(result.ops).toEqual([
      { insert: 'AC', attributes: { bold: true } }
    ]);
  });
});