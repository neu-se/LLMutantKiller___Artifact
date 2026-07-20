import Delta from "../../../../../../../../../../src/Delta";

describe('compose() embed handler keepNull parameter for insert embed', () => {
  it('passes keepNull=false when composing an inserted embed with an embed retain', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed('myembed', {
      compose: (_a: unknown, b: unknown, keepNull: boolean) => {
        capturedKeepNull = keepNull;
        return b;
      },
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    try {
      // thisOp is an insert embed (retain == null), so action = 'insert'
      // Original: keepNull = (action === 'retain') = false
      // Mutated:  keepNull = true (always)
      const a = new Delta().insert({ myembed: { text: 'hello' } });
      const b = new Delta().retain({ myembed: { text: 'world' } });

      a.compose(b);

      expect(capturedKeepNull).toBe(false);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});