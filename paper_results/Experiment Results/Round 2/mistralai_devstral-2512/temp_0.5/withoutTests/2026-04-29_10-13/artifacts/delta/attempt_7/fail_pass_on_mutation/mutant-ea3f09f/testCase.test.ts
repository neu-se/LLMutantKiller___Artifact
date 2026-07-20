import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when both deltas have object retains with same embed type', () => {
    // Setup a custom embed handler for testing
    const testEmbedType = 'test-embed';
    Delta.registerEmbed(testEmbedType, {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b
    });

    // Create two deltas with object retains of same embed type
    const delta1 = new Delta().retain({ [testEmbedType]: { id: 1 } });
    const delta2 = new Delta().retain({ [testEmbedType]: { id: 2 } });

    // Transform delta2 with delta1
    const result = delta2.transform(delta1, true);

    // The result should be a retain operation with transformed embed
    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    expect(typeof result.ops[0].retain).toBe('object');
    expect(testEmbedType in result.ops[0].retain!).toBe(true);

    // Clean up
    Delta.unregisterEmbed(testEmbedType);
  });
});