import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with insert and delete', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('ABC');
    const expected = new Delta().retain(1).insert('BC');
    expect(a.diff(b)).toEqual(expected);
  });

  it.skip('diff() should handle max length correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('AB');
    const diff = a.diff(b);
    expect(diff.ops[0].insert).toEqual('B');
    expect(diff.length()).toEqual(2);
  });
});