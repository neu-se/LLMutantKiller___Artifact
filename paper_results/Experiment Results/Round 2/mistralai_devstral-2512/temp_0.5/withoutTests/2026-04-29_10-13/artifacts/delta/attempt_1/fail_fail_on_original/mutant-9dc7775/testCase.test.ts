import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when thisData is null', () => {
    // Setup a custom embed handler
    const embedType = 'custom';
    Delta.registerEmbed(embedType, {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? a : b
    });

    // Create deltas with embed operations
    const delta1 = new Delta().retain({ [embedType]: null });
    const delta2 = new Delta().retain({ [embedType]: { value: 1 } });

    // Transform should handle null thisData correctly
    const result = delta1.transform(delta2, true);

    // The result should be a retain operation with the transformed embed
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(result.ops[0].retain).toEqual({ [embedType]: { value: 1 } });

    Delta.unregisterEmbed(embedType);
  });
});