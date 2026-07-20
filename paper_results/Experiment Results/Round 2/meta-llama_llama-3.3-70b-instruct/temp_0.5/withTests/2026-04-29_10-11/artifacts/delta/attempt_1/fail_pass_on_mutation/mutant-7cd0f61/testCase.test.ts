import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should throw an error when called on non-document', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    expect(() => a.diff(b)).toThrowError('diff() called on non-document');
  });
});