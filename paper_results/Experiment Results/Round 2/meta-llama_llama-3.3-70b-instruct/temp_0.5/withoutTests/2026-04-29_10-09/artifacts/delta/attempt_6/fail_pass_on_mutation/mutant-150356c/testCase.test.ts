import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle composition correctly', () => {
    const delta1 = new Delta();
    delta1.insert('a');

    const delta2 = new Delta();
    delta2.retain(1);

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].insert).toBe('a');
  });
});