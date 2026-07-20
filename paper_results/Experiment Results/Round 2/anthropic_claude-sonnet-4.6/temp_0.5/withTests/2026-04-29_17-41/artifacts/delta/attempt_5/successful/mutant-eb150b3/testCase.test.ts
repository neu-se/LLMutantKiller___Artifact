import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() embed handler keepNull', () => {
  it('passes keepNull=false to handler.compose when action is insert embed composed with embed retain', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<{ value: string }>('myEmbed', {
      compose: (a: unknown, b: unknown, keepNull: boolean): { value: string } => {
        capturedKeepNull = keepNull;
        return { value: (a as { value: string }).value + (b as { value: string }).value };
      },
      invert: (_a: unknown, b: unknown): { value: string } => b as { value: string },
      transform: (_a: unknown, b: unknown, _priority: boolean): { value: string } => b as { value: string },
    });

    try {
      // thisOp = insert embed, otherOp = embed retain => action = 'insert'
      // Original: keepNull = (action === 'retain') = false
      // Mutated:  keepNull = (action !== 'retain') = true
      const a = new Delta().insert({ myEmbed: { value: 'hello' } });
      const b = new Delta().retain({ myEmbed: { value: 'world' } });

      a.compose(b);

      expect(capturedKeepNull).toBe(false);
    } finally {
      Delta.unregisterEmbed('myEmbed');
    }
  });
});