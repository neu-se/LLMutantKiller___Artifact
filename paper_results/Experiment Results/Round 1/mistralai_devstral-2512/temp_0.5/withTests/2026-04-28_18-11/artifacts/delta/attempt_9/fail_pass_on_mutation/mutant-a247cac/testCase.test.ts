import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization edge case', () => {
  it('should trigger the specific optimization condition that exposes the mutation', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    // The mutation changes the array index check from -1 to +1
    // This test verifies the exact output that would differ if the mutation is present
    expect(result.ops).toEqual([
      { insert: 'AC', attributes: { bold: true } }
    ]);
  });
});