import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with embeds', () => {
  it('should correctly compose embeds with insert action', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => {
        // This will return different values based on keepNull parameter
        return keepNull ? { composed: 'with-null', a, b } : { composed: 'without-null', a, b };
      },
      invert: (_a, b) => b,
      transform: (a, b, priority) => priority ? a : b
    });

    // Create a delta with an insert operation containing an embed
    const delta1 = new Delta().insert({ test: 'value1' });
    // Create a delta with a retain operation on the same embed
    const delta2 = new Delta().retain({ test: 'value2' });

    const result = delta1.compose(delta2);

    // In the original code, when action is 'insert', keepNull should be false
    // In the mutated code, keepNull is always true
    // The handler will return different objects based on this parameter
    const composedOp = result.ops[0];
    expect(composedOp.insert.test).toEqual({ composed: 'without-null', a: 'value1', b: 'value2' });

    // Clean up
    Delta.unregisterEmbed('test');
  });
});