import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization correctly concatenates remaining ops', () => {
    // When otherIter is exhausted and thisIter still has ops,
    // the optimization fires if last delta op equals newOp.
    // The optimization uses concat(rest).chop() which can merge the boundary op
    // differently than processing ops one by one through the loop.
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B', { bold: true })
      .insert('C', { bold: true });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert('ABC', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});