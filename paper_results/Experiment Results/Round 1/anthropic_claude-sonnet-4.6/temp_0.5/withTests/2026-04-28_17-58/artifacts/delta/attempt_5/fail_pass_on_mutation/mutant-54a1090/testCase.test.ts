import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('compose with other having insert after plain retain matching this insert length', () => {
    // The original condition pushes otherIter.next() when thisIter is at an insert
    // fitting within firstLeft. With mutation=false, otherIter.next() is never called
    // in that branch, causing otherIter to not advance, changing the result.
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    // After compose: 'B' inserted after 'A' retained -> 'AB'  
    // But with mutation the loop processes differently
    const expected = new Delta().insert('AB');
    expect(a.compose(b)).toEqual(expected);
  });
});