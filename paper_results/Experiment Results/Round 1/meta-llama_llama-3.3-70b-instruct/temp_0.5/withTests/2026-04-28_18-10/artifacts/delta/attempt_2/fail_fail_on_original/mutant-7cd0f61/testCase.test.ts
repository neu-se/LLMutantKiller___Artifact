import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with original code should throw an error with non-document', () => {
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().insert('A');
    expect(() => a.diff(b)).toThrowError('diff() called on non-document');
  });

  it('diff() with mutated code should not throw an error with non-document', () => {
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().insert('A');
    const result = a.diff(b);
    expect(result).toBeDefined();
  });
});