import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should handle embed transforms correctly when handler is registered', () => {
    // Setup a custom embed handler
    const testHandler = {
      compose: (a: number, b: number) => a + b,
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? a : b
    };
    Delta.registerEmbed('test', testHandler);

    // Create deltas with embeds
    const delta1 = new Delta().retain({ test: 5 });
    const delta2 = new Delta().retain({ test: 3 });

    // Transform should use the handler when available
    const result = delta1.transform(delta2, true);

    // Verify the transformation used the handler (should preserve delta1's value due to priority)
    expect(result.ops).toEqual([{ retain: { test: 5 } }]);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});