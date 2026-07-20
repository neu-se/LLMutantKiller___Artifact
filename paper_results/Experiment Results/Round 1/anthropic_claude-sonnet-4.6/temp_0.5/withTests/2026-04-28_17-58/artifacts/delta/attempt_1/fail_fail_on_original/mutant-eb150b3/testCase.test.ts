import Delta from '../../src/Delta';
import Op from '../../src/Op';

describe('compose() with custom embed handler keepNull parameter', () => {
  it('passes keepNull=true when composing a retain embed (action === retain)', () => {
    // Track the keepNull value passed to the handler
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed<{ value: string | null }>('myembed', {
      compose: (a, b, keepNull) => {
        capturedKeepNull = keepNull;
        // Return b's value, but preserve null if keepNull is true
        const result: { value: string | null } = { value: (b as any).value };
        if (keepNull === false && result.value === null) {
          return { value: (a as any).value };
        }
        return result;
      },
      invert: (a, b) => b as any,
      transform: (a, b, priority) => b as any,
    });

    try {
      // a retains an embed object, b retains the same embed type with another embed
      // This triggers action === 'retain' path
      const a = new Delta().retain({ myembed: { value: 'original' } });
      const b = new Delta().retain({ myembed: { value: null } });

      a.compose(b);

      // With original code: action === 'retain' => keepNull = true
      // With mutated code: action !== 'retain' => keepNull = false
      expect(capturedKeepNull).toBe(true);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});