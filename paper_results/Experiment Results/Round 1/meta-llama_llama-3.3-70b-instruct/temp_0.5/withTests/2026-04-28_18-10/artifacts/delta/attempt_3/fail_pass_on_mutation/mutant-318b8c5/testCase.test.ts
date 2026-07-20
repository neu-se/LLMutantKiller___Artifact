import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with insert and delete', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('ABC');
    const expected = new Delta().retain(1).insert('BC');
    expect(a.diff(b)).toEqual(expected);
  });

  it.skip('diff() should handle length correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('AB');
    const c = new Delta().insert('ABC');
    const d = new Delta().insert('ABD');
    const abDiff = a.diff(b);
    const bcDiff = b.diff(c);
    const bdDiff = b.diff(d);
    expect(abDiff.length()).toEqual(2);
    expect(bcDiff.length()).toEqual(2);
    expect(bdDiff.length()).toEqual(2);
  });
});