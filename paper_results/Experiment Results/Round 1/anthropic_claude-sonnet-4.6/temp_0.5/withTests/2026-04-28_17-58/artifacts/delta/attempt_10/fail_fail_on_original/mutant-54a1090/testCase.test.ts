import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('detects when other insert appears before this insert in compose result', () => {
    // If firstLeft = firstOther.retain (the initial plain retain length of other),
    // and thisIter has a short insert, original pushes otherIter.next() WITHOUT
    // consuming thisIter. This means when otherIter reaches an INSERT op,
    // that insert gets pushed BEFORE thisIter's insert is processed.
    // With mutation=false, both are processed together in else branch,
    // which would put thisIter's insert first.
    const a = new Delta().insert('B');
    const b = new Delta().retain(1).insert('A').delete(1);
    // original with firstLeft=1: pushes retain(1) from otherIter, thisIter stays on insert('B')
    // then otherIter at insert('A'): peekType of thisIter is still 'insert', push otherIter = insert('A')
    // then otherIter at delete(1): thisIter is insert('B'), goes to else... 
    // Actually this is getting complex. Let me just try it.
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});