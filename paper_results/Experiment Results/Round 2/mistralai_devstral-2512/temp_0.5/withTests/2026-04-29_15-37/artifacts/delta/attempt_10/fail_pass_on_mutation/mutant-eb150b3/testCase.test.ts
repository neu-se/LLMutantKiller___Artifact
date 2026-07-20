import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed attributes', () => {
  beforeEach(() => {
    Delta.registerEmbed<{ text: string }>('test', {
      compose: (a, b, keepNull) => {
        return { text: b.text + a.text };
      },
      transform: (a, b) => b,
      invert: (a, b) => b,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('test');
  });

  it('composes embeds with attributes in correct order', () => {
    // Create a delta with an embed that has attributes
    const a = new Delta().insert({ test: { text: 'A' } }, { bold: true });

    // Create a delta that retains with different attributes
    const b = new Delta().retain({ test: { text: 'B' } }, { italic: true });

    // Compose them
    const result = a.compose(b);

    // The result should have the composed embed and combined attributes
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].insert).toEqual({ test: { text: 'BA' } });
    expect(result.ops[0].attributes).toEqual({ bold: true, italic: true });
  });
});