import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with embed handler keepNull parameter', () => {
  it('passes keepNull=false when composing an insert embed with an embed retain', () => {
    // Register a handler that records the keepNull value passed to compose
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<{ value: string }>('testEmbed', {
      compose: (a, b, keepNull) => {
        capturedKeepNull = keepNull;
        return { value: (a as any).value + (b as any).value };
      },
      invert: (a, b) => b as any,
      transform: (a, b, priority) => b as any,
    });

    try {
      // thisOp is an insert with embed, otherOp is a retain with embed
      // action = 'insert' (since thisOp.retain is null)
      // Original: keepNull = (action === 'retain') = false
      // Mutated:  keepNull = (action !== 'retain') = true
      const a = new Delta().insert({ testEmbed: { value: 'a' } });
      const b = new Delta().retain({ testEmbed: { value: 'b' } });

      a.compose(b);

      // When action is 'insert', keepNull should be false (action === 'retain' is false)
      expect(capturedKeepNull).toBe(false);
    } finally {
      Delta.unregisterEmbed('testEmbed');
    }
  });
});