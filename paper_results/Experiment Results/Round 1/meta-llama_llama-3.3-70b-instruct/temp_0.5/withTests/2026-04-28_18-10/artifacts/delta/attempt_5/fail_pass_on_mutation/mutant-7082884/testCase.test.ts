import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should not throw an error when comparing two identical Deltas', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!');
    expect(() => delta1.diff(delta2)).not.toThrowError();
  });
});