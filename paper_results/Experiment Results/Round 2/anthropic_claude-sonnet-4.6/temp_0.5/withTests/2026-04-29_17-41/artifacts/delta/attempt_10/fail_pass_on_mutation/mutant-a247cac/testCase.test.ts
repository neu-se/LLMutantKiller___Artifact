import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization join merges ops at boundary correctly', () => {
    // This tests the case from existing suite that relies on the optimization
    // to correctly join ops at the boundary via concat vs loop processing
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    const b = new Delta().retain(1).delete(1);
    // Without optimization: loop processes remaining ops normally
    // With optimization: concat merges 'C'{bold} with what came before
    // The join happens because last delta op after delete = insert('C',bold)
    // which equals the newOp being processed for 'C'{bold}
    const expected = new Delta()
      .insert('AC', { bold: true })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    expect(a.compose(b)).toEqual(expected);
  });
});