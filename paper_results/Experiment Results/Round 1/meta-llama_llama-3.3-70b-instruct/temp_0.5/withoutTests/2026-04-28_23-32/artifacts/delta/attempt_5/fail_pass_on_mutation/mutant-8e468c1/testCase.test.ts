import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle composition correctly', () => {
    const delta1 = new Delta().insert('Hello, ');
    const delta2 = new Delta().retain(1);

    const composedDelta = delta1.compose(delta2);

    expect(composedDelta.ops[0].retain).toBeUndefined();
    expect(composedDelta.ops[0].insert).toBe('Hello, ');
  });
});