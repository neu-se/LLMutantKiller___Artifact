import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly handle object embed data with null thisData during transform', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b,
    });

    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: { key: 'value' } });

    // This should work in original code but fail in mutated version
    // due to incorrect null check logic in the placeholder condition
    const result = delta1.transform(delta2, true);

    // Verify the transformation produced valid output
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(result.ops[0].retain).toHaveProperty('test');
    expect(result.ops[0].retain.test).toEqual({ key: 'value' });

    // Clean up
    Delta.unregisterEmbed('test');
  });
});