import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when thisData is null', () => {
    // Setup a custom embed handler
    const embedType = 'custom';
    Delta.registerEmbed(embedType, {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b
    });

    // Create deltas with embed operations
    const delta1 = new Delta().retain({ [embedType]: null });
    const delta2 = new Delta().retain({ [embedType]: { value: 1 } });

    // Transform should handle null thisData correctly
    const result = delta1.transform(delta2, true);

    // The result should be a retain operation with the transformed embed
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(result.ops[0].retain).toEqual({ [embedType]: { value: 1 } });

    Delta.unregisterEmbed(embedType);
  });
});