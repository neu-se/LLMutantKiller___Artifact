import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with multiple inserts and firstOther.retain is a number and thisIter.peekType is insert and firstOther.retain is greater than thisIter.peekLength', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('ABCD');
    expect(a.compose(b)).toEqual(expected);
  });
});