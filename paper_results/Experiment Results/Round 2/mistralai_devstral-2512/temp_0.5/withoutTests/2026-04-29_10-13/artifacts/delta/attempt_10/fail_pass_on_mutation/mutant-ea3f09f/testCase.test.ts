import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is object and otherData is undefined', () => {
    // Setup a custom embed handler for testing
    const testEmbedType = 'test-embed';
    Delta.registerEmbed(testEmbedType, {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b
    });

    // Create a delta with object retain
    const delta1 = new Delta().retain({ [testEmbedType]: { id: 1 } });
    // Create a delta with undefined retain (should be treated as number 0)
    const delta2 = new Delta().retain(0);

    // Transform delta1 with delta2
    const result = delta1.transform(delta2, true);

    // The result should be empty since object retain + 0 retain should cancel out
    expect(result.ops.length).toBe(0);

    // Clean up
    Delta.unregisterEmbed(testEmbedType);
  });
});