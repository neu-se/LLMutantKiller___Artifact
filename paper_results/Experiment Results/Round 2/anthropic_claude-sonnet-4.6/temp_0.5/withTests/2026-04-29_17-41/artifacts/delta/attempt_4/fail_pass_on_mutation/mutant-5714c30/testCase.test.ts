import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('does not call embed handler when thisData is null (object type but null value)', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // Construct a delta where retain is explicitly null via ops array
      // thisData = null: typeof null === 'object' is true, but null !== null is false
      // Original: true && false => false, skip embed handler
      // Mutated: true || (null !== null && ...) => true || false => true, enters embed handler
      //          then Object.keys(null) throws TypeError
      const a = new Delta([{ retain: null as any }]);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(() => a.transform(b, false)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});