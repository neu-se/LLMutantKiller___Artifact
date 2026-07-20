import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed attributes', () => {
  beforeEach(() => {
    Delta.registerEmbed<{ value: string }>('test', {
      compose: (a, b, keepNull) => {
        // This handler is sensitive to keepNull parameter
        // When keepNull is true, preserve null attributes from b
        // When keepNull is false, ignore null attributes from b
        return {
          value: b.value + a.value,
          ...(keepNull ? { nullAttr: b.nullAttr } : {})
        };
      },
      transform: (a, b) => b,
      invert: (a, b) => b,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('test');
  });

  it('preserves null attributes when composing with retain', () => {
    // Create a delta with an embed
    const a = new Delta().insert({ test: { value: 'A' } }, { bold: true });

    // Create a delta that retains with null attribute
    const b = new Delta().retain({ test: { value: 'B', nullAttr: null } });

    // Compose them
    const result = a.compose(b);

    // With original code (keepNull=true for retain), should preserve the null attribute
    // With mutated code (keepNull=false for retain), should not include the null attribute
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].insert).toEqual({ test: { value: 'BA', nullAttr: null } });
  });
});