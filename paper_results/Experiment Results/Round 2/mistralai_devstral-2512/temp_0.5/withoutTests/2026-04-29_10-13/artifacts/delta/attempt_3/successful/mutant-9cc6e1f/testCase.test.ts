import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle embed type mismatch in transform', () => {
    // Register two different embed handlers
    Delta.registerEmbed('embed1', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => (priority ? b : a),
    });

    Delta.registerEmbed('embed2', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => (priority ? b : a),
    });

    // Create deltas with different embed types
    const delta1 = new Delta().retain({ embed1: 'value1' });
    const delta2 = new Delta().retain({ embed2: 'value2' });

    // Transform should handle embed type mismatch
    const result = delta1.transform(delta2, true);
    const expectedOps = [{ retain: { embed2: 'value2' } }];
    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('embed1');
    Delta.unregisterEmbed('embed2');
  });
});