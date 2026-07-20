import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with custom embed handler - keepNull behavior', () => {
  it('should not keep null attributes when composing an insert embed with a retain embed (action is insert, keepNull should be false)', () => {
    // Register a handler that tracks the keepNull parameter passed to compose
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<Record<string, unknown>>('myembed', {
      compose: (a: Record<string, unknown>, b: Record<string, unknown>, keepNull: boolean) => {
        capturedKeepNull = keepNull;
        // Return a simple merged object
        const result: Record<string, unknown> = { ...a, ...b };
        if (!keepNull) {
          // Remove null values when keepNull is false
          for (const key of Object.keys(result)) {
            if (result[key] === null) {
              delete result[key];
            }
          }
        }
        return result;
      },
      invert: (a: Record<string, unknown>, b: Record<string, unknown>) => ({}),
      transform: (a: Record<string, unknown>, b: Record<string, unknown>, priority: boolean) => b,
    });

    try {
      // a inserts an embed (action will be 'insert', so keepNull should be false)
      const a = new Delta().insert({ myembed: { value: 'original', extra: null } });
      // b retains with an embed retain (object retain)
      const b = new Delta().retain({ myembed: { value: 'updated' } });

      const result = a.compose(b);

      // With original code: keepNull = false (action === 'retain' is false for insert)
      // So null values should be removed from the composed embed
      // With mutated code: keepNull = true, so null values would be preserved

      // capturedKeepNull should be false in the original code
      expect(capturedKeepNull).toBe(false);

      // The result should not contain null values (keepNull=false removes them)
      const embedResult = (result.ops[0].insert as Record<string, unknown>)['myembed'] as Record<string, unknown>;
      expect(embedResult).not.toHaveProperty('extra');
      expect(embedResult['value']).toBe('updated');
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});