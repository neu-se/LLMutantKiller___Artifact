import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed attributes', () => {
  beforeEach(() => {
    Delta.registerEmbed<string>('test', {
      compose: (a, b, keepNull) => {
        // This handler is sensitive to keepNull parameter
        // When keepNull is true, preserve nulls from b
        // When keepNull is false, ignore nulls from b
        return keepNull ? (b !== undefined ? b : a) : (b !== null ? b : a);
      },
      transform: (a, b) => b,
      invert: (a, b) => b,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('test');
  });

  it('handles null embed values correctly during composition', () => {
    // Create a delta with a non-null embed
    const a = new Delta().insert({ test: 'original' }, { bold: true });

    // Create a delta that retains with null embed
    const b = new Delta().retain({ test: null }, { bold: null });

    // Compose them
    const result = a.compose(b);

    // With original code (keepNull=true for retain), should preserve the null embed
    // With mutated code (keepNull=false for retain), should keep original embed value
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].insert).toEqual({ test: null });
    expect(result.ops[0].attributes).toEqual({});
  });
});