import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and insert', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('B');
    const expected = new Delta().insert('B').retain(1);
    expect(a.compose(b)).toEqual(expected);
  });
});