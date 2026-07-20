import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when both operations have object retains', () => {
    // Setup a custom embed handler for testing
    const testEmbedType = 'test-embed';
    Delta.registerEmbed(testEmbedType, {
      compose: (a, b) => ({ ...a, ...b }),
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? a : b
    });

    // Create deltas with embed operations
    const delta1 = new Delta().retain({ [testEmbedType]: { id: 1 } });
    const delta2 = new Delta().retain({ [testEmbedType]: { id: 2 } });

    // Transform delta2 with delta1
    const result = delta2.transform(delta1, true);

    // The result should be a retain operation with the transformed embed
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(typeof result.ops[0].retain).toBe('object');
    expect(result.ops[0].retain).toHaveProperty(testEmbedType);

    // Clean up
    Delta.unregisterEmbed(testEmbedType);
  });
});