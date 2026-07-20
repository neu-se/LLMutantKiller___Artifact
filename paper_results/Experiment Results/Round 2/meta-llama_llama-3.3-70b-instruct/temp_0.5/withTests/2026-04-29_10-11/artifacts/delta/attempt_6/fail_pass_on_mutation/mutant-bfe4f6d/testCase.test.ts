import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain optimization', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(1).insert('C');
    const expected = new Delta().insert('A').insert('C').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});