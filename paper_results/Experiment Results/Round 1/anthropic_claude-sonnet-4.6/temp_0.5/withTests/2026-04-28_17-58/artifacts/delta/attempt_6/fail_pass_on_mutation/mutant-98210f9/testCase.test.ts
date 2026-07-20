import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() retain-embed with retain-embed keepNull parameter', () => {
  it('when composing two retain-embeds, keepNull should be true (action=retain), affecting null attribute handling', () => {
    // Track what keepNull value is passed to compose handler
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<{ value: string | null }>('myembed', {
      compose: (a: { value: string | null }, b: { value: string | null }, keepNull: boolean) => {
        capturedKeepNull = keepNull;
        return { value: b.value };
      },
      transform: (a: { value: string | null }, b: { value: string | null }, priority: boolean) => b,
      invert: (a: { value: string | null }, b: { value: string | null }) => b,
    });

    try {
      const a = new Delta().retain({ myembed: { value: 'a' } });
      const b = new Delta().retain({ myembed: { value: 'b' } });
      a.compose(b);

      // Original: action = 'retain' (thisOp.retain != null), so keepNull = (action === 'retain') = true
      // Mutated:  action = 'insert' (always true), so keepNull = (action === 'retain') = false
      expect(capturedKeepNull).toBe(true);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});