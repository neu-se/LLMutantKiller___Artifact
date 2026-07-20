import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly calculate the length of the diff', () => {
    const delta1 = new Delta();
    delta1.insert('a');

    const delta2 = new Delta();
    delta2.insert('ab');

    const diff = delta1.diff(delta2);

    expect(diff.ops.length).toBe(1);
  });
});