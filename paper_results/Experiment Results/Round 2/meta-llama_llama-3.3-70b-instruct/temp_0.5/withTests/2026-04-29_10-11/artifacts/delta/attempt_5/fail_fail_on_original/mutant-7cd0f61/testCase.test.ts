import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should throw an error when called with the same delta', () => {
    const a = new Delta().insert('Test');
    expect(() => a.diff(a)).toThrowError('diff() called on non-document');
  });

  it('diff() should throw an error when called with a different delta', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    expect(() => a.diff(b)).toThrowError('diff() called with non-document');
  });
});