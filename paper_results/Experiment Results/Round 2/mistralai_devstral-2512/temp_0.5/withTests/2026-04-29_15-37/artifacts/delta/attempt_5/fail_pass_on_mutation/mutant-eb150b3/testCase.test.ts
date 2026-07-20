import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embeds', () => {
  beforeEach(() => {
    Delta.registerEmbed<{ text: string }>('test', {
      compose: (a, b, keepNull) => {
        return { text: b.text + a.text };
      },
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('test');
  });

  it('composes embeds in correct order', () => {
    const a = new Delta().insert({ test: { text: 'A' } });
    const b = new Delta().retain({ test: { text: 'B' } });
    const result = a.compose(b);
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0].insert).toEqual({ test: { text: 'BA' } });
  });
});