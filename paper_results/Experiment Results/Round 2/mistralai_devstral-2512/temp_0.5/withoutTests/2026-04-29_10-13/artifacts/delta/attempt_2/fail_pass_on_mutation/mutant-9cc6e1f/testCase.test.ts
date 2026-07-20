import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds with matching types', () => {
    // Register a custom embed handler for testing
    Delta.registerEmbed('custom', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => (priority ? b : a),
    });

    // Create deltas with embeds of the same type
    const delta1 = new Delta().retain({ custom: 'value1' });
    const delta2 = new Delta().retain({ custom: 'value2' });

    // Transform should work when embed types match
    const result = delta1.transform(delta2, true);
    const expectedOps = [{ retain: { custom: 'value2' } }];
    expect(result.ops).toEqual(expectedOps);

    // Clean up
    Delta.unregisterEmbed('custom');
  });
});