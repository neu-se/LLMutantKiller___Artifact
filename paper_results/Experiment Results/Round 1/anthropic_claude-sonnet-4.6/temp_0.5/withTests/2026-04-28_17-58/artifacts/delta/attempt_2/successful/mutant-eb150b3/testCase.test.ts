import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with custom embed handler keepNull parameter', () => {
  it('passes keepNull=true when composing retain embeds, preserving null values correctly', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<{ val: string | null }>('myembed', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        capturedKeepNull = keepNull;
        return { val: 'result' };
      },
      invert: (_a: unknown, _b: unknown) => ({ val: 'inverted' }),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ val: 'transformed' }),
    });

    try {
      // When a retains an embed and b retains the same embed type,
      // action === 'retain', so keepNull should be true (original)
      // With mutation action !== 'retain' => keepNull = false
      const a = new Delta().retain({ myembed: { val: 'a' } });
      const b = new Delta().retain({ myembed: { val: 'b' } });
      a.compose(b);
      expect(capturedKeepNull).toBe(true);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});