import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly handle object embed data during transform', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b,
    });

    const delta1 = new Delta().retain({ test: { key: 'value1' } });
    const delta2 = new Delta().retain({ test: { key: 'value2' } });

    const result = delta1.transform(delta2, true);

    // Verify the transformation produced valid output
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(typeof result.ops[0].retain).toBe('object');
    expect(result.ops[0].retain).toHaveProperty('test');

    // Clean up
    Delta.unregisterEmbed('test');
  });
});