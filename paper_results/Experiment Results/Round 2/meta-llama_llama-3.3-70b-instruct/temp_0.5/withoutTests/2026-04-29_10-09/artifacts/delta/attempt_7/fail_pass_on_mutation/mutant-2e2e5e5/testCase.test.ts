import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error with correct message when diff is called with non-document and the same delta', () => {
    const delta1 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    const delta2 = new Delta([{ retain: { foo: 'bar' } }]);
    const errorOriginal = 'diff() called on non-document';
    const errorMutated = 'diff() called  non-document';
    expect(() => delta1.diff(delta2)).toThrowError(errorOriginal);
    expect(() => delta1.diff(delta1)).not.toThrowError();
  });
});