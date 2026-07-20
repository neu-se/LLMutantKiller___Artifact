import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when diff() is called with a non-document', () => {
    const delta = new Delta().insert('A');
    const other = new Delta().retain(1).insert('B');
    expect(() => delta.diff(other)).toThrowError('diff() called on non-document');
  });
});