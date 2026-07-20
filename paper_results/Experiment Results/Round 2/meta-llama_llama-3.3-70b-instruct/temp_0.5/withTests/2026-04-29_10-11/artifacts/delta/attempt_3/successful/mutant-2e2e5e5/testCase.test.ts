import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error with the correct message when diff() is called with a non-document', () => {
    const delta = new Delta().retain(1).insert('B');
    const other = new Delta().insert('A');
    expect(() => delta.diff(other)).toThrowError('diff() called with non-document');
  });
});