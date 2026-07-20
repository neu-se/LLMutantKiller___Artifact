import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain optimization', () => {
    const a = new Delta().insert('ABC');
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('ABC').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});