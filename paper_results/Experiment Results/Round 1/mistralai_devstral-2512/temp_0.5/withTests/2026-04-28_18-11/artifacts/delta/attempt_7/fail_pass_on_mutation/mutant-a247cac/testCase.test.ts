import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization', () => {
  it('should correctly handle the optimization case that triggers the array access', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    const result = a.compose(b);
    // The mutation changes the array index from -1 to +1 which would cause an out-of-bounds access
    // This specific test case should expose the difference in behavior
    expect(result.ops).toEqual([
      { insert: 'AC', attributes: { bold: true } }
    ]);
  });
});