import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle composition correctly', () => {
    const delta1 = new Delta();
    delta1.retain(5);

    const delta2 = new Delta();
    delta2.retain(3);
    delta2.insert('test');

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[0].retain).toBe(3);
    expect(composedDelta.ops[1].insert).toBe('test');
    expect(composedDelta.ops[0].insert).toBeUndefined();
  });
});