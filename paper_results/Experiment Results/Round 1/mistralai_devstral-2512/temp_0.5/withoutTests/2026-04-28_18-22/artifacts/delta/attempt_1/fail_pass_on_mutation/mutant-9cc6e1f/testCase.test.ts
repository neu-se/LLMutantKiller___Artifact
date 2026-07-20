import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when embed types match', () => {
    // Register a custom embed handler for testing
    const embedHandler = {
      compose: (a: number, b: number) => a + b,
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? b : a
    };
    Delta.registerEmbed('test-embed', embedHandler);

    // Create deltas with embed operations
    const delta1 = new Delta().retain({ 'test-embed': 5 });
    const delta2 = new Delta().retain({ 'test-embed': 3 });

    // Transform should use the handler when embed types match
    const result = delta1.transform(delta2, true);

    // Verify the transformation used the handler (not just returning the other data)
    expect(result.ops).toEqual([{ retain: { 'test-embed': 3 } }]);

    // Clean up
    Delta.unregisterEmbed('test-embed');
  });
});