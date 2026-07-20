import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with custom embed handler - keepNull behavior', () => {
  it('should pass keepNull=true when composing retain+retain embeds so null attributes are preserved', () => {
    // Register an embed handler that tracks the keepNull argument
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[], keepNull: boolean) => {
        capturedKeepNull = keepNull;
        return new Delta(a).compose(new Delta(b)).ops;
      },
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // a has a retain embed (object retain), b has a retain embed (object retain)
      // This triggers action === 'retain', so keepNull should be true
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      a.compose(b);

      // In the original code: action === 'retain' => keepNull = true
      // In the mutated code: action === '' => keepNull = false
      expect(capturedKeepNull).toBe(true);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});