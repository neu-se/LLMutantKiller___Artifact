import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('B');
    const result = a.diff(b);
    expect(() => {
      if (result.ops[0].insert === String.fromCharCode(0)) {
        throw new Error('diff() called with non-document');
      }
    }).not.toThrowError('diff() called with non-document');
    expect(a.diff(b).toString()).toContain('on');
  });
});