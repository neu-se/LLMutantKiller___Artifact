import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should throw an error with correct message when delta and other are different', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    expect(() => a.diff(b)).toThrowError('diff() called with non-document');
  });
});