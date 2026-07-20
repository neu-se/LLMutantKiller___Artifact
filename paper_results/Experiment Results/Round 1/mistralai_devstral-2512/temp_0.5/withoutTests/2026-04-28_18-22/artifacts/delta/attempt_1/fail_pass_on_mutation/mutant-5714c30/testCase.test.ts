import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when thisData is null', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? a : b,
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain({ test: 'value2' });

    // This should work without throwing an error in the original code
    // but will fail in the mutated version due to incorrect null check
    const result = delta1.transform(delta2, true);

    // Verify the transformation produced valid output
    expect(result.ops.length).toBeGreaterThan(0);
    expect(result.ops[0]).toHaveProperty('retain');

    // Clean up
    Delta.unregisterEmbed('test');
  });
});