import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly calculate the diff between two deltas', () => {
    const delta1 = new Delta();
    delta1.insert('abc');
    const delta2 = new Delta();
    delta2.insert('ab');
    const diff = delta1.diff(delta2);
    expect(diff.ops[0].delete).toBe(1);
  });
});