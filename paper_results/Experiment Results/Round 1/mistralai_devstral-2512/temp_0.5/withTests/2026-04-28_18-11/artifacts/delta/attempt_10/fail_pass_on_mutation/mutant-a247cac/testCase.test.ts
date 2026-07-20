import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization with specific structure', () => {
  it('should expose the array bounds mutation when optimization triggers', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    // The mutation changes delta.ops.length - 1 to +1 which would cause different behavior
    // This test specifically checks for the optimized output
    expect(result.ops).toEqual([
      { insert: 'AC', attributes: { bold: true } }
    ]);
  });
});