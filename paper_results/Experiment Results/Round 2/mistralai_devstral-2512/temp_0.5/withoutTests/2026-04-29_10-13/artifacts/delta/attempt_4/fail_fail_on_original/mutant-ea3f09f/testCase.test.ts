import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when one delta has object retain and other has number retain', () => {
    // Setup a custom embed handler for testing
    const testEmbedType = 'test-embed';
    Delta.registerEmbed(testEmbedType, {
      compose: (a: unknown, b: unknown) => ({ ...(a as object), ...(b as object) }),
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b
    });

    // Create a delta with object retain
    const delta1 = new Delta().retain({ [testEmbedType]: { id: 1 } });
    // Create a delta with numeric retain
    const delta2 = new Delta().retain(5);

    // Transform delta2 with delta1
    const result = delta2.transform(delta1, true);

    // The result should be a retain operation with numeric value
    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    expect(typeof result.ops[0].retain).toBe('number');
    expect(result.ops[0].retain).toBe(5);

    // Clean up
    Delta.unregisterEmbed(testEmbedType);
  });
});