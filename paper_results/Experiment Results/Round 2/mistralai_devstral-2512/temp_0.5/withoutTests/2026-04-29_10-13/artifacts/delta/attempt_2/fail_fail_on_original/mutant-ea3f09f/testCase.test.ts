import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should handle non-object retain data correctly when transforming', () => {
    // Setup a custom embed handler for testing
    const testEmbedType = 'test-embed';
    Delta.registerEmbed(testEmbedType, {
      compose: (a, b) => ({ ...a, ...b }),
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? a : b
    });

    // Create a delta with object retain
    const delta1 = new Delta().retain({ [testEmbedType]: { id: 1 } });
    // Create a delta with numeric retain
    const delta2 = new Delta().retain(5);

    // Transform delta2 with delta1 - this should trigger the mutated condition
    const result = delta2.transform(delta1, true);

    // The result should be a retain operation with numeric value
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(typeof result.ops[0].retain).toBe('number');
    expect(result.ops[0].retain).toBe(5);

    // Clean up
    Delta.unregisterEmbed(testEmbedType);
  });
});