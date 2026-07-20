import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with insert and delete', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('ABC');
    const expected = new Delta().retain(1).insert('BC');
    expect(a.diff(b)).toEqual(expected);
  });

  it.skip('diff() should handle length with multiple inserts and deletes', () => {
    const a = new Delta().insert('A').insert('B').delete(1);
    const b = new Delta().insert('ABC');
    const expected = new Delta().retain(1).insert('C');
    expect(a.diff(b)).toEqual(expected);
  });
});