import Delta from "../../../../../../../../../../../../../src/Delta";

describe('compose() with custom embed handler - keepNull for insert embed', () => {
  it('compose of inserted embed with embed uses keepNull=false, not true', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed('testEmbed', {
      compose: (_a: unknown, _b: unknown, keepNull: boolean) => {
        capturedKeepNull = keepNull;
        return keepNull ? { kept: true } : { kept: false };
      },
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({}),
    });

    try {
      // 'a' inserts an embed (action === 'insert'), so keepNull should be false in original
      // In the mutant, keepNull is always true
      const a = new Delta().insert({ testEmbed: { value: 'original' } });
      const b = new Delta().retain({ testEmbed: { value: 'updated' } });

      const result = a.compose(b);

      // Original: keepNull = (action === 'retain') = false => { kept: false }
      // Mutant:   keepNull = true => { kept: true }
      expect(result.ops[0]).toEqual({ insert: { testEmbed: { kept: false } } });
    } finally {
      Delta.unregisterEmbed('testEmbed');
    }
  });
});