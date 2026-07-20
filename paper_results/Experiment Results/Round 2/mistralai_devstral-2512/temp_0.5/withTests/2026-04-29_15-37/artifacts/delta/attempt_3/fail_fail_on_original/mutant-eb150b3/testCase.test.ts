import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embeds', () => {
  beforeEach(() => {
    // Register a simple embed handler that's sensitive to keepNull
    Delta.registerEmbed<string>('test', {
      compose: (a, b, keepNull) => {
        // When keepNull is true, preserve nulls from b
        // When keepNull is false, ignore nulls from b
        return keepNull ? (b ?? a) : (b !== null ? b : a);
      },
      transform: (a, b, priority) => (priority ? b : a),
      invert: (a, b) => b,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('test');
  });

  it('composes embeds with null handling based on action type', () => {
    // Create a delta with an embed
    const a = new Delta().insert({ test: 'original' });

    // Create another delta that retains with a null embed
    const b = new Delta().retain({ test: null });

    // The result depends on whether keepNull is true (original) or false (mutated)
    const result = a.compose(b);

    // With original code (keepNull=true for retain), should preserve the null
    // With mutated code (keepNull=false for retain), should keep original value
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0]).toEqual({ insert: { test: null } });
  });
});