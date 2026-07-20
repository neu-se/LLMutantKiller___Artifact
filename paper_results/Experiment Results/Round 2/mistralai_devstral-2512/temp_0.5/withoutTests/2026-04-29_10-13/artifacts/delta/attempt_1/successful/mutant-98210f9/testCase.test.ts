import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds', () => {
  it('should correctly compose retain and insert operations with embeds', () => {
    // Setup a custom embed handler for testing
    const embedType = 'custom';
    Delta.registerEmbed(embedType, {
      compose: (a: string, b: string) => a + b,
      invert: (a: string, b: string) => b,
      transform: (a: string, b: string) => b,
    });

    // Create deltas with embed operations
    const delta1 = new Delta().retain({ [embedType]: 'a' });
    const delta2 = new Delta().retain({ [embedType]: 'b' });

    // Compose the deltas
    const result = delta1.compose(delta2);

    // Verify the result
    expect(result.ops).toEqual([{ retain: { [embedType]: 'ab' } }]);

    // Clean up
    Delta.unregisterEmbed(embedType);
  });
});