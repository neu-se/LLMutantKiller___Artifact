import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error with correct message when diff is called with the same delta', () => {
    const delta1 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    const delta2 = new Delta([{ insert: 'Hello' }, { insert: 'World' }]);
    expect(() => delta1.diff(delta2)).not.toThrowError();
    expect(() => delta1.diff(delta1)).toThrowError('diff() called with non-document');
  });
});