import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    expect(() => a.diff(b)).toThrowError('diff() called on non-document');
  });
});