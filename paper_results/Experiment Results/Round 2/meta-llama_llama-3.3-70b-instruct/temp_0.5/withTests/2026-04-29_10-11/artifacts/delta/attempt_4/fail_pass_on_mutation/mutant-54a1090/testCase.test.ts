import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('compose with firstOther being a retain and thisIter having multiple inserts', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});