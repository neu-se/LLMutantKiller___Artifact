import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with insert and retain at the beginning', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(0).insert(' World');
    const expected = new Delta().insert(' World').insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});