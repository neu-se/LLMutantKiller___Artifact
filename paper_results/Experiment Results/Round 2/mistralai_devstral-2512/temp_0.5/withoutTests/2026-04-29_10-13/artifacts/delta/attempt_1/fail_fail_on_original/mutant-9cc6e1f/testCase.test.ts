import Delta from './src/Delta';
import Op from './src/Op';

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds with matching types', () => {
    // Register a custom embed handler for testing
    Delta.registerEmbed('custom', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => (priority ? b : a),
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