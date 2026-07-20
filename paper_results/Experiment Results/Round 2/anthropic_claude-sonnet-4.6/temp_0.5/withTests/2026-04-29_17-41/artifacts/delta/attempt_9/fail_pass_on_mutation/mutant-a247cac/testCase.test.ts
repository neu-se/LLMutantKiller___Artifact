import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization fires when other exhausted and last op matches newOp allowing rest to be concatenated', () => {
    // Construct case where:
    // 1. otherIter exhausts after one step
    // 2. thisIter still has remaining ops
    // 3. last pushed op in delta equals newOp being processed
    // The optimization returns delta.concat(rest).chop() early
    // Without optimization, remaining thisIter ops processed as retains through loop
    // concat can merge boundary string inserts that loop would also merge via push
    // Key: find case where concat produces different op structure than loop
    const a = new Delta()
      .insert('Hello', { bold: true })
      .insert(' World', { bold: true });
    const b = new Delta().retain(5, { bold: true });
    const expected = new Delta().insert('Hello World', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});