import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const originalError = 'diff() called on non-document';
    const mutatedError = 'diff() called with non-document';
    expect(() => a.diff(b)).toThrowError(originalError);
  });
});