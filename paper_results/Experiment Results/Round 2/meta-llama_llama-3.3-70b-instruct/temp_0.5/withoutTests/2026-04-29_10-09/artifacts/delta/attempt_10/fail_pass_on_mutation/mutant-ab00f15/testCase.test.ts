import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle retain with length less than or equal to 0', () => {
    const delta = new Delta();
    delta.retain(0);
    expect(delta.ops.length).toBe(0);
    delta.retain(-1);
    expect(delta.ops.length).toBe(0);
    delta.retain(1);
    expect(delta.ops.length).toBe(1);
    const delta2 = new Delta();
    delta2.retain(0);
    expect(delta2.ops.length).toBe(0);
    delta2.retain(-1);
    expect(delta2.ops.length).toBe(0);
    delta2.retain(0);
    expect(delta2.ops.length).toBe(0);
    delta2.retain(-1);
    expect(delta2.ops.length).toBe(0);
    delta2.retain(1);
    expect(delta2.ops.length).toBe(1);
    expect(() => delta2.retain(0)).not.toThrow();
    expect(delta2.ops.length).toBe(1);
    expect(() => delta2.retain(-1)).not.toThrow();
    expect(delta2.ops.length).toBe(1);
    expect(delta2.ops[0].retain).toBe(1);
  });
});