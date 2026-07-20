import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when otherData is not an object', () => {
    // Setup a custom embed handler for testing
    const testEmbedType = 'test-embed';
    Delta.registerEmbed(testEmbedType, {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b
    });

    // Create a delta with object retain
    const delta1 = new Delta().retain({ [testEmbedType]: { id: 1 } });
    // Create a delta with string retain (not an object)
    const delta2 = new Delta().retain("test");

    // Transform delta2 with delta1
    const result = delta2.transform(delta1, true);

    // The result should be a retain operation with string value
    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    expect(typeof result.ops[0].retain).toBe('string');
    expect(result.ops[0].retain).toBe("test");

    // Clean up
    Delta.unregisterEmbed(testEmbedType);
  });
});