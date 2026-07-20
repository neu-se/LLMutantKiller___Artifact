import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain optimization', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(0).insert('B');
    const expected = new Delta().insert('B').insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});