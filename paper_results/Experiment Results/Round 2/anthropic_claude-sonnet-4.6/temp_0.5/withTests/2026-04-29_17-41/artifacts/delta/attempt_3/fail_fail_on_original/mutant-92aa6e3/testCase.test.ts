import Delta from "../../src/Delta";

describe('compose() with custom embed handler', () => {
  it('compose of inserted embed with embed passes keepNull=false (not true)', () => {
    const composeArgs: Array<{ keepNull: boolean }> = [];

    Delta.registerEmbed('myEmbed', {
      compose: (_a: unknown, _b: unknown, keepNull: boolean) => {
        composeArgs.push({ keepNull });
        // Return different results based on keepNull to make the difference observable
        return keepNull ? { result: 'null-kept' } : { result: 'null-removed' };
      },
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({}),
    });

    try {
      // 'a' is an INSERT of an embed (action === 'insert')
      // Original: keepNull = (action === 'retain') = false
      // Mutant:   keepNull = true always
      const a = new Delta().insert({ myEmbed: { value: 'original' } });
      const b = new Delta().retain({ myEmbed: { value: 'updated' } });

      const result = a.compose(b);

      // Original passes keepNull=false => result is { result: 'null-removed' }
      // Mutant passes keepNull=true => result is { result: 'null-kept' }
      expect(result.ops[0]).toEqual({
        insert: { myEmbed: { result: 'null-removed' } },
      });
    } finally {
      Delta.unregisterEmbed('myEmbed');
    }
  });
});