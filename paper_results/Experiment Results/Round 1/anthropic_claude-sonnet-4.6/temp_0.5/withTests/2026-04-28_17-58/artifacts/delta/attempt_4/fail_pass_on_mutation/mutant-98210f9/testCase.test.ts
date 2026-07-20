import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() retain embed with retain embed produces correct op type', () => {
  it('composing retain-embed with retain-embed produces a retain not an insert', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const composed = a.compose(b);

      // Original: composed.ops[0] = { retain: { delta: [...] } }
      // Mutated:  composed.ops[0] = { insert: { delta: [...] } }
      // Directly check the op type
      expect(composed.ops.length).toBeGreaterThan(0);
      const firstOp = composed.ops[0];
      // In original, retain is defined; in mutated, insert is defined instead
      expect(typeof firstOp.retain).toBe('object');
      expect(firstOp.retain).not.toBeNull();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});