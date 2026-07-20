import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('AB');
    expect(() => a.diff(b)).toThrowError('diff() called with non-document');
  });
});