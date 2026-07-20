import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with custom embed handler - keepNull parameter for insert embed', () => {
  it('passes keepNull=false when composing an inserted embed with another embed', () => {
    // Track the keepNull argument passed to handler.compose
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<Record<string, unknown>>('testEmbed', {
      compose: (a: Record<string, unknown>, b: Record<string, unknown>, keepNull: boolean) => {
        capturedKeepNull = keepNull;
        // Return a result that differs based on keepNull
        const result: Record<string, unknown> = { ...a as object, ...b as object };
        if (!keepNull) {
          // Remove null values when keepNull is false
          Object.keys(result).forEach(k => {
            if (result[k] === null) delete result[k];
          });
        }
        return result;
      },
      invert: (a: Record<string, unknown>, b: Record<string, unknown>) => b,
      transform: (a: Record<string, unknown>, b: Record<string, unknown>, priority: boolean) => b,
    });

    try {
      // 'a' is an INSERT of an embed (not a retain), so action === 'insert', keepNull should be false
      const a = new Delta().insert({ testEmbed: { value: 'original', extra: null } });
      const b = new Delta().retain({ testEmbed: { value: 'updated' } });

      a.compose(b);

      // In the original code: action === 'retain' evaluates to false for an insert,
      // so keepNull should be false
      // In the mutated code: keepNull is always true
      expect(capturedKeepNull).toBe(false);
    } finally {
      Delta.unregisterEmbed('testEmbed');
    }
  });
});