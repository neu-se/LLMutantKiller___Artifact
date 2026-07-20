import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with insert and retain', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b).ops).toEqual([{ insert: 'A' }]);
  });
});