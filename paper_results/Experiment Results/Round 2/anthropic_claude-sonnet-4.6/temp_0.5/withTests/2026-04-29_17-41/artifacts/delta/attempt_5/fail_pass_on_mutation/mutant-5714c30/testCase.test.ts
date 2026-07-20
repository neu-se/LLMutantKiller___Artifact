import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('does not throw when thisOp retain is null and otherOp retain is an object', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData = null: typeof null === 'object' is TRUE
      // Original: true && (null !== null) => true && false => false, skip embed handler
      // Mutated:  true || (...) => true, enters embed handler, Object.keys(null) throws TypeError
      const a = new Delta([{ retain: null as any }]);
      const b = new Delta([{ retain: { delta: [{ insert: 'b' }] } }]);
      // Original: no throw, returns a delta
      // Mutated: throws TypeError from Object.keys(null)
      expect(() => a.transform(b, false)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});