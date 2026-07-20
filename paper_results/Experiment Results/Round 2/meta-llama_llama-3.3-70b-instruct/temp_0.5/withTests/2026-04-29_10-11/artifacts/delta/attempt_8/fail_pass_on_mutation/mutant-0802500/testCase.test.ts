import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose optimization with insert and retain', () => {
    const a = new Delta().insert('Hello').insert(' World');
    const b = new Delta().retain(5);
    const expected = new Delta().insert('Hello').insert(' World');
    expect(a.compose(b)).toEqual(expected);
  });
});