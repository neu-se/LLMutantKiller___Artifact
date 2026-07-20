import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('compose with firstOther being a retain and thisIter having multiple inserts, and firstLeft is greater than 0', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3);
    const expected = new Delta().insert('A').insert('B').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});