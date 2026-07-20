import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should return an empty Delta when comparing two identical Deltas', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!');
    const result = delta1.diff(delta2);
    expect(result.ops.length).toBe(0);
    expect(result.changeLength()).toBe(0);
  });
});