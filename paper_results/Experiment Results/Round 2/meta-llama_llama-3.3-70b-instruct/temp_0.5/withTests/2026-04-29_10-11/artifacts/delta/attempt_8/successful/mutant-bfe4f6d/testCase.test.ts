import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain optimization', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(0);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});