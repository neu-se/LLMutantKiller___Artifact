import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with insert and retain', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5).insert('!');
    const expected = new Delta().insert('Hello!').retain(5);
    expect(a.compose(b)).toEqual(expected);
  });
});