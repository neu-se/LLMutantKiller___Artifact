import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is object and otherData is number', () => {
    // Setup a custom embed handler for testing
    const testEmbedType = 'test-embed';
    Delta.registerEmbed(testEmbedType, {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b
    });

    // Create a delta with object retain
    const delta1 = new Delta().retain({ [testEmbedType]: { id: 1 } });
    // Create a delta with numeric retain
    const delta2 = new Delta().retain(5);

    // Transform delta1 with delta2 (note the order)
    const result = delta1.transform(delta2, true);

    // The result should be a retain operation with numeric value
    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    expect(typeof result.ops[0].retain).toBe('number');
    expect(result.ops[0].retain).toBe(5);

    // Clean up
    Delta.unregisterEmbed(testEmbedType);
  });
});