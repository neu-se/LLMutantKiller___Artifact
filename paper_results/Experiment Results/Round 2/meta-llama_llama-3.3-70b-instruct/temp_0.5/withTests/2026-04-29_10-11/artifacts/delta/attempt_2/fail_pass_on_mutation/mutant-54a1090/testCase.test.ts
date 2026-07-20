import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('retain start optimization with firstOther being a retain', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('A').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});