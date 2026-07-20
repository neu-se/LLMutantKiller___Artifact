import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should throw an error when comparing non-document deltas', () => {
    const a = new Delta().delete(1);
    const b = new Delta().insert('A');
    expect(() => a.diff(b)).toThrowError('diff() called with non-document');
  });
});