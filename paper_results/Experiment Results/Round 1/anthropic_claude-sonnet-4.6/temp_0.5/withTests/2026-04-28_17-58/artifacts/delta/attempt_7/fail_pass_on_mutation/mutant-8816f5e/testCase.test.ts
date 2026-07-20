import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('does not throw when thisData is an embed object and otherData retain is null', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData = {delta:[{insert:'a'}]} (object, non-null)
      // otherData = null (typeof null === 'object', but null !== null is false)
      // Original condition: true && true && true && false = false -> skip handler
      // Mutated condition: (true && true) || (true && false) = true -> enters block
      //   Object.keys(null) -> TypeError!
      const a = new Delta([{ retain: { delta: [{ insert: 'a' }] } }]);
      const b = new Delta([{ retain: null as any }]);
      
      expect(() => a.transform(b, true)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});