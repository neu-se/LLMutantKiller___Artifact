import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('handles insert from other when this has inserts fitting within initial plain retain', () => {
    // The mutation changes the while-loop condition from
    // (thisIter.peekType() === 'insert' && thisIter.peekLength() <= firstLeft)
    // to false, so the otherIter.next() push inside that branch never executes.
    // This affects cases where other starts with a plain retain and this has inserts
    // whose total length exactly matches or is less than that retain.
    const a = new Delta().insert('AB'); // length 2
    const b = new Delta().retain(2).delete(1).insert('X');
    // With original: inserts from `a` are handled via optimization path
    // With mutation: falls through to normal path
    const expected = new Delta().insert('ABX').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});