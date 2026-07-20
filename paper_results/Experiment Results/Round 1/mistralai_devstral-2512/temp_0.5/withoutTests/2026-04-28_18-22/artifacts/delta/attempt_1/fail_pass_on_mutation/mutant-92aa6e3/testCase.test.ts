import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Delta compose with embeds', () => {
  it('should correctly compose embeds with retain action', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => {
        if (keepNull) {
          return a;
        }
        return b;
      },
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? a : b
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain({ test: 'value2' });
    const result = delta1.compose(delta2);

    // The result should have the second embed's value when keepNull is false (action === 'retain')
    // In the original code, action === 'retain' evaluates to true, so keepNull is true
    // In the mutated code, keepNull is always true, which changes the behavior
    expect(result.ops).toEqual([{ retain: { test: 'value1' } }]);

    // Clean up
    Delta.unregisterEmbed('test');
  });
});