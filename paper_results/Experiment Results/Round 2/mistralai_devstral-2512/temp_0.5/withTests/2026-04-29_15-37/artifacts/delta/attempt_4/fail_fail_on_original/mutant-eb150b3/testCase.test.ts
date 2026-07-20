import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embeds', () => {
  beforeEach(() => {
    Delta.registerEmbed<{ text: string }>('test', {
      compose: (a, b, keepNull) => {
        // Simple composition that just concatenates text
        return { text: a.text + b.text };
      },
      transform: (a, b, priority) => a,
      invert: (a, b) => b,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('test');
  });

  it('composes embed retain operations correctly', () => {
    // Create a delta with an embed insert
    const a = new Delta().insert({ test: { text: 'A' } }, { bold: true });

    // Create a delta that retains with a different embed
    const b = new Delta().retain({ test: { text: 'B' } }, { italic: true });

    // Compose them
    const result = a.compose(b);

    // The result should have the composed embed and combined attributes
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0].insert).toEqual({ test: { text: 'BA' } });
    expect(result.ops[0].attributes).toEqual({ bold: true, italic: true });
  });
});