import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff() with a non-document', () => {
    const delta1 = new Delta();
    expect(() => delta1.diff(delta1)).toThrowError('diff() called on non-document');
  });
});