import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization with remaining this ops after other exhausted', () => {
    const a = new Delta()
      .insert('AB')
      .insert('CD');
    const b = new Delta().retain(2, { bold: true });
    // After processing retain(2,bold) against insert('AB'),
    // otherIter is exhausted, thisIter still has insert('CD')
    // Optimization fires if last delta op equals newOp
    // concat merges 'CD' directly; loop would process 'CD' as retain which differs
    const expected = new Delta()
      .insert('AB', { bold: true })
      .insert('CD');
    expect(a.compose(b)).toEqual(expected);
  });
});