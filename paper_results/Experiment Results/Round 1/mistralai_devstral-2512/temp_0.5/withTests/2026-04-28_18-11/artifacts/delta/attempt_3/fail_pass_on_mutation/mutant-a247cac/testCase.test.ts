import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization edge case', () => {
  it('should trigger the optimization condition with specific delta structure', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    // This test specifically checks the internal optimization behavior
    // The mutation changes the array index check from -1 to +1 which would cause an out-of-bounds access
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toEqual({ insert: 'AC', attributes: { bold: true } });
  });
});