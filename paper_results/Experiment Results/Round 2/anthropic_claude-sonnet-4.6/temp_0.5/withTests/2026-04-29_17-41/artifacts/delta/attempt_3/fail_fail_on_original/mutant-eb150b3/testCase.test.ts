import Delta from "../../../../../../../../../src/Delta";

describe('compose() with embed handler keepNull parameter', () => {
  it('passes keepNull=false to handler.compose when action is insert', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<{ value: string }>('testEmbed', {
      compose: (a: unknown, b: unknown, keepNull: boolean): { value: string } => {
        capturedKeepNull = keepNull;
        return { value: (a as { value: string }).value + (b as { value: string }).value };
      },
      invert: (_a: unknown, b: unknown): { value: string } => b as { value: string },
      transform: (_a: unknown, b: unknown, _priority: boolean): { value: string } => b as { value: string },
    });

    try {
      const a = new Delta().insert({ testEmbed: { value: 'hello' } });
      const b = new Delta().retain({ testEmbed: { value: 'world' } });

      a.compose(b);

      // action === 'insert' (thisOp is an insert embed)
      // Original: keepNull = (action === 'retain') = false
      // Mutated:  keepNull = (action !== 'retain') = true
      expect(capturedKeepNull).toBe(false);
    } finally {
      Delta.unregisterEmbed('testEmbed');
    }
  });
});