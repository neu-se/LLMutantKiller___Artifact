import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and insert', () => {
    const a = new Delta().retain(3).insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().retain(1).insert('B').retain(2).insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});