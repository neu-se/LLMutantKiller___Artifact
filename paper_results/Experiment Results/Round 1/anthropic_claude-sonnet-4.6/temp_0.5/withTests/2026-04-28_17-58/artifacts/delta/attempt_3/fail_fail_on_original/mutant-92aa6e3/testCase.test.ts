import Delta from "../../../../../../../../../../src/Delta";

describe('compose() with embed handler - keepNull parameter for insert action', () => {
  it('passes keepNull=false when composing an inserted embed with an embed retain', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed('myembed', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        capturedKeepNull = keepNull;
        return b;
      },
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    try {
      // thisOp is an insert embed, so action = 'insert', keepNull should be (action === 'retain') = false
      const a = new Delta().insert({ myembed: { text: 'hello' } });
      const b = new Delta().retain({ myembed: { text: 'world' } });

      a.compose(b);

      // Original code: keepNull = (action === 'retain') = false
      // Mutated code:  keepNull = true
      expect(capturedKeepNull).toBe(false);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});