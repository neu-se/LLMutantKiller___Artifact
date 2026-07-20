import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta();
    delta1.retain(7);
    const delta2 = new Delta();
    delta2.insert('Hello, ');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(2);
    expect(composedDelta.ops[0].retain).toBe(7);
    expect(composedDelta.ops[1].insert).toBe('Hello, ');
  });
});