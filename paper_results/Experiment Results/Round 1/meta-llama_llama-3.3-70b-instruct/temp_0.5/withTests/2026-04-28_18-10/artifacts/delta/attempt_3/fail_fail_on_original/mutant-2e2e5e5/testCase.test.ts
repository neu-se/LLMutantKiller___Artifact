import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const error = new Error('diff() called on non-document');
    const errorMessage = error.message;
    const diffResult = a.diff(b);
    expect(() => {
      if (diffResult.ops[0].insert === String.fromCharCode(0)) {
        throw new Error('diff() called with non-document');
      }
    }).not.toThrowError('diff() called with non-document');
  });
});