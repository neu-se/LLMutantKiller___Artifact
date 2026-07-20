import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds', () => {
  it('should correctly compose embeds with retain operations', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b
    });

    // Create deltas with embed operations
    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain({ test: 'value2' });

    // Compose the deltas
    const result = delta1.compose(delta2);

    // Verify the result has the correct embed value
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].retain).toEqual({ test: 'value2' });

    // Clean up
    Delta.unregisterEmbed('test');
  });
});