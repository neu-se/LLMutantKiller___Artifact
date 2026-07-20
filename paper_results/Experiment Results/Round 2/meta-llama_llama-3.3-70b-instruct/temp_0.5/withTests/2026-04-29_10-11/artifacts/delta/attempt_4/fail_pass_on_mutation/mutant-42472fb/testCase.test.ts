import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with multiple inserts when firstOther.retain is a number', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2).insert('C');
    const expected = new Delta().insert('ABC');
    expect(a.compose(b)).toEqual(expected);
  });
});