import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('compose with firstOther being a retain and thisIter having an insert, and firstLeft is greater than 0', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(3);
    const expected = new Delta().insert('A').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});