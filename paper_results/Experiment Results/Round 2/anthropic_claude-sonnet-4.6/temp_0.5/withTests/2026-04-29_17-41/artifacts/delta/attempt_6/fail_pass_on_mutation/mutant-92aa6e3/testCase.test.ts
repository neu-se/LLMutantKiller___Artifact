import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with custom embed handler', () => {
  it('compose passes otherData not true as second argument to handler.compose', () => {
    let capturedB: unknown;

    Delta.registerEmbed('myEmbed', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => {
        capturedB = b;
        return { composed: true };
      },
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({}),
    });

    try {
      const a = new Delta().insert({ myEmbed: { value: 'original' } });
      const b = new Delta().retain({ myEmbed: { value: 'updated' } });

      a.compose(b);

      // Original: second arg is otherData = { value: 'updated' }
      // Mutant:   second arg is true
      expect(capturedB).toEqual({ value: 'updated' });
    } finally {
      Delta.unregisterEmbed('myEmbed');
    }
  });
});