import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization', () => {
  it('should efficiently handle when other ends with plain retains matching the last op', () => {
    // This test exercises the optimization path where otherIter has no more ops
    // and the last delta op equals newOp - the optimization returns early with concat
    // The mutant changes this condition to `false`, disabling the optimization
    // 
    // We need a case where the result differs: when thisIter.rest() has ops that
    // would be merged differently via concat vs push
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