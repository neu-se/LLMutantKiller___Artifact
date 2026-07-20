import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return a Delta with the correct length when calling diff() on two empty Deltas', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    const result = delta1.diff(delta2);
    expect(result.length()).not.toBe(0);
  });
});