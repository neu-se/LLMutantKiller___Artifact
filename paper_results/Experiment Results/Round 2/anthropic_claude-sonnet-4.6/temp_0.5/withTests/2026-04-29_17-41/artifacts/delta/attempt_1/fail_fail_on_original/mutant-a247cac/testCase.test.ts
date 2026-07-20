import Delta from "../../src/Delta";

describe('compose() retain end optimization', () => {
  it('retain end optimization join produces correct result', () => {
    // This test exercises the optimization path in compose() where
    // the last op in delta equals the current newOp, triggering early return.
    // With the mutation (delta.ops[delta.ops.length + 1] instead of delta.ops[delta.ops.length - 1]),
    // the optimization never fires, but the result should still be correct.
    // However, the "retain end optimization join" case relies on the optimization
    // to correctly merge ops.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    const b = new Delta().retain(1).delete(1);
    const expected = new Delta()
      .insert('AC', { bold: true })
      .insert('D')
      .insert('E', { bold: true })
      .insert('F');
    expect(a.compose(b)).toEqual(expected);
  });
});