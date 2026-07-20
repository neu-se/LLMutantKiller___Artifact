import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with custom embed handler', () => {
  it('compose of inserted embed with embed passes keepNull=false causing null attributes to be removed', () => {
    Delta.registerEmbed('myEmbed', {
      compose: (a: unknown, _b: unknown, keepNull: boolean) => {
        // Return the keepNull flag as part of result so we can observe it
        return { ...(a as object), keepNull };
      },
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({}),
    });

    try {
      const a = new Delta().insert({ myEmbed: { value: 'original' } });
      const b = new Delta().retain({ myEmbed: { value: 'updated' } });

      const result = a.compose(b);

      // Original: action === 'retain' is false => keepNull=false => { value: 'original', keepNull: false }
      // Mutant:   keepNull=true => { value: 'original', keepNull: true }
      expect(result.ops[0]).toEqual({
        insert: { myEmbed: { value: 'original', keepNull: false } },
      });
    } finally {
      Delta.unregisterEmbed('myEmbed');
    }
  });
});