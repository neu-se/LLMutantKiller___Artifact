import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle retain with length less than or equal to 0', () => {
    const delta = new Delta();
    expect(() => delta.retain(0)).not.toThrow();
    expect(delta.ops.length).toBe(0);
    expect(() => delta.retain(-1)).not.toThrow();
    expect(delta.ops.length).toBe(0);
    expect(() => delta.retain(1)).not.toThrow();
    expect(delta.ops.length).toBe(1);
    expect(() => delta.retain(0)).not.toThrow();
    expect(delta.ops.length).toBe(1);
    expect(() => delta.retain(-1)).not.toThrow();
    expect(delta.ops.length).toBe(1);
    expect(() => delta.retain(NaN)).not.toThrow();
    expect(delta.ops.length).toBe(2);
  });
});