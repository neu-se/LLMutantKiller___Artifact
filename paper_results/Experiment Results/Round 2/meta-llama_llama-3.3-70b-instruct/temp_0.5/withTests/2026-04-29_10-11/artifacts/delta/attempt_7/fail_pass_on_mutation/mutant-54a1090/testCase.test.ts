import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('compose with firstOther being a retain and thisIter having an insert, and condition thisIter.peekType() === "insert" && thisIter.peekLength() <= firstLeft is met', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
    const c = new Delta().insert('A').insert('B');
    const d = new Delta().retain(2);
    const expected2 = new Delta().insert('A').insert('B');
    expect(c.compose(d)).toEqual(expected2);
  });
});