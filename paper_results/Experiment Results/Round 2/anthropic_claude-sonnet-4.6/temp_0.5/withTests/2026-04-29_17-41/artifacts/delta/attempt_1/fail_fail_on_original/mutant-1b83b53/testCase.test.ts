import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with embed handler keepNull parameter', () => {
  it('passes keepNull=true when composing retain embed with retain embed', () => {
    // Track the keepNull argument passed to the handler's compose function
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<{ value: string | null }>('myembed', {
      compose: (a, b, keepNull) => {
        capturedKeepNull = keepNull;
        // When keepNull is true, preserve null values from b
        // When keepNull is false, remove null values
        const result: { value: string | null } = { value: (b as any).value };
        if (!keepNull && result.value === null) {
          return { value: (a as any).value };
        }
        return result;
      },
      invert: (a, b) => b as { value: string | null },
      transform: (a, b, priority) => b as { value: string | null },
    });

    try {
      // a retains an embed, b retains the same embed type
      // action will be 'retain' since thisOp.retain is an object
      const a = new Delta().retain({ myembed: { value: 'original' } });
      const b = new Delta().retain({ myembed: { value: null } });

      a.compose(b);

      // In original code: keepNull = (action === 'retain') = true
      // In mutated code: keepNull = (action === '') = false
      expect(capturedKeepNull).toBe(true);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});