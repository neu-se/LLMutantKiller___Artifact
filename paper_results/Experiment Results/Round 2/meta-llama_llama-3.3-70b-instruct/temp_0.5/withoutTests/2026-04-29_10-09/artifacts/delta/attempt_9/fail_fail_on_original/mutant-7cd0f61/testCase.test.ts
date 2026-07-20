import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff() on two Deltas with a non-document', () => {
    const delta1 = new Delta();
    const delta2 = new Delta([{ insert: 'Hello' }]);
    expect(() => delta1.diff(delta2)).toThrowError('diff() called on non-document');
  });
});