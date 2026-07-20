import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should not throw an error when called with the same delta and then a different delta', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    expect(() => a.diff(a)).not.toThrow();
    expect(() => a.diff(b)).toThrowError('diff() called with non-document');
  });
});