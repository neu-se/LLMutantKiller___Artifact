import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff with non-document', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    delta1.insert({ test: 'test' });
    delta2.insert({ test: 'test' });
    expect(() => delta1.diff(delta2)).toThrowError('diff() called with non-document');
  });
});