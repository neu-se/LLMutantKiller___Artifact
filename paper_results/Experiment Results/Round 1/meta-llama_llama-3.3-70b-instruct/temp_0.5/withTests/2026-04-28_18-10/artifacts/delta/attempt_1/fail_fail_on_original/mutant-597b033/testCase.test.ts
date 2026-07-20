import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when trying to compose a delta with a non-document', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    expect(() => a.compose(b)).toThrowError('diff() called on non-document');
  });
});