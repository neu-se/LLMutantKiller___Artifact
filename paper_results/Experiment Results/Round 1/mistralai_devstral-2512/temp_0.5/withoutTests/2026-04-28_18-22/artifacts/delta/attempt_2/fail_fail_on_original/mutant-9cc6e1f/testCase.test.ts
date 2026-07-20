import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly handle embed type mismatch in transform', () => {
    // Register a custom embed handler for testing
    const embedHandler = {
      compose: (a: number, b: number) => a + b,
      invert: (a: number, b: number) => b - a,
      transform: (a: number, b: number, priority: boolean) => priority ? b : a
    };
    Delta.registerEmbed('test-embed', embedHandler);

    // Create deltas with different embed types
    const delta1 = new Delta().retain({ 'test-embed': 5 });
    const delta2 = new Delta().retain({ 'other-embed': 3 });

    // Transform should not use handler when embed types don't match
    const result = delta1.transform(delta2, true);

    // In original code: should retain the other data as-is (length 3)
    // In mutated code: will incorrectly try to use handler (if true)
    expect(result.ops).toEqual([{ retain: 3 }]);

    // Clean up
    Delta.unregisterEmbed('test-embed');
  });
});