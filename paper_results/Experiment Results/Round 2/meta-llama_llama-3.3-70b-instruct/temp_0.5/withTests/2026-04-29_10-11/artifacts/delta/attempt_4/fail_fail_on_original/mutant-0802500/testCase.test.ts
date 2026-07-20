import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and insert', () => {
    const a = new Delta().retain(5);
    const b = new Delta().insert('Hello');
    const expected = new Delta().insert('Hello').retain(5);
    expect(a.compose(b)).toEqual(expected);
  });
});