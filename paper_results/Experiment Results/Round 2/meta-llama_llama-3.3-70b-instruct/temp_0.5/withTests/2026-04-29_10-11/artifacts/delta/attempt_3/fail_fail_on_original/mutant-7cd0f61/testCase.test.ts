import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should throw an error with correct message when delta and other are the same', () => {
    const a = new Delta().insert('Test');
    expect(() => a.diff(a)).toThrowError('diff() called on non-document');
  });

  it('diff() should throw an error with correct message when delta and other are different', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    expect(() => a.diff(b)).toThrowError('diff() called with non-document');
    expect(() => b.diff(a)).toThrowError('diff() called on non-document');
  });
});