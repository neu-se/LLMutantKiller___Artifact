import Delta from "../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() embed handler keepNull for insert embed', () => {
  it('compose of inserted embed with embed retain uses keepNull=false', () => {
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
      const a = new Delta().insert({ myembed: { text: 'hello' } });
      const b = new Delta().retain({ myembed: { text: 'world' } });
      a.compose(b);
      // Original: action === 'retain' is false when thisOp is insert => keepNull = false
      // Mutated:  always true
      expect(capturedKeepNull).toBe(false);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});