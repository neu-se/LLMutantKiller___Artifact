import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta push method', () => {
  it('should correctly add ops that cannot be merged, maintaining proper array structure', () => {
    // Create a scenario with insert followed by retain with different attributes
    // These cannot be merged so push must add a new op
    const delta = new Delta();
    delta.retain(5, { bold: true });
    delta.retain(3, { italic: true });
    
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ retain: 5, attributes: { bold: true } });
    expect(delta.ops[1]).toEqual({ retain: 3, attributes: { italic: true } });
    
    // Verify the delta works correctly in compose
    const base = new Delta().insert('hello world!!');
    const composed = base.compose(delta);
    expect(composed.ops).toEqual([
      { retain: 5, attributes: { bold: true } },
      { retain: 3, attributes: { italic: true } },
      { insert: '!!' }
    ]);
  });
});