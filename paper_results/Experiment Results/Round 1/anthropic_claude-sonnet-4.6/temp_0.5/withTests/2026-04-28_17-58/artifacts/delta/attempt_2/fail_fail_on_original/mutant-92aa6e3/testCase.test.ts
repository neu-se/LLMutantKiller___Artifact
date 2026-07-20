import Delta from "../../../../../../../../../src/Delta";

describe('compose() with custom embed handler - keepNull for insert embed', () => {
  it('compose of insert embed with retain embed passes keepNull=false to handler', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<{ val: string | null }>('testemd', {
      compose: (a: { val: string | null }, b: { val: string | null }, keepNull: boolean) => {
        capturedKeepNull = keepNull;
        return { val: keepNull ? a.val : (b.val ?? a.val) };
      },
      invert: (_a: { val: string | null }, _b: { val: string | null }) => ({ val: null }),
      transform: (_a: { val: string | null }, b: { val: string | null }, _priority: boolean) => b,
    });

    try {
      // thisOp is an insert (retain == null), so action = 'insert', keepNull should be false
      const a = new Delta().insert({ testemd: { val: 'original' } });
      const b = new Delta().retain({ testemd: { val: 'updated' } });

      a.compose(b);

      // Original: action === 'retain' => false (since action is 'insert')
      // Mutated:  always true
      expect(capturedKeepNull).toBe(false);
    } finally {
      Delta.unregisterEmbed('testemd');
    }
  });
});