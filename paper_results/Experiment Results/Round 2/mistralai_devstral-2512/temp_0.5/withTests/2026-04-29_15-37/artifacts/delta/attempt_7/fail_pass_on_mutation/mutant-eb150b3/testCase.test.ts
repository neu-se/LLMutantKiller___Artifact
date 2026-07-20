import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed attributes', () => {
  beforeEach(() => {
    Delta.registerEmbed<string>('test', {
      compose: (a, b, keepNull) => {
        // Simple composition that just returns b
        return b;
      },
      transform: (a, b) => b,
      invert: (a, b) => b,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('test');
  });

  it('composes embeds with attributes correctly', () => {
    // Create a delta with an embed that has attributes
    const a = new Delta().insert({ test: 'A' }, { bold: true, color: 'red' });

    // Create a delta that retains with different attributes
    const b = new Delta().retain({ test: 'B' }, { bold: null, italic: true });

    // Compose them
    const result = a.compose(b);

    // The result should have the new embed and combined attributes
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].insert).toEqual({ test: 'B' });
    expect(result.ops[0].attributes).toEqual({ color: 'red', italic: true });
  });
});