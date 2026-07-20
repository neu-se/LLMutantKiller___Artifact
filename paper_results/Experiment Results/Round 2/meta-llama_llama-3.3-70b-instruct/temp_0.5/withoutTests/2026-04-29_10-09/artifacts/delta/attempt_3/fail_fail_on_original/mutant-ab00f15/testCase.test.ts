import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle retain with length less than or equal to 0', () => {
    const delta = new Delta();
    const originalDelta = new Delta();
    originalDelta.retain(0);
    const mutatedDelta = new Delta();
    mutatedDelta.retain(-1);
    expect(mutatedDelta.ops.length).toBe(0);
    expect(originalDelta.ops.length).toBe(0);
    const delta2 = new Delta();
    delta2.retain(1);
    expect(delta2.ops.length).toBe(1);
    expect(() => delta.retain(NaN)).toThrow();
  });
});