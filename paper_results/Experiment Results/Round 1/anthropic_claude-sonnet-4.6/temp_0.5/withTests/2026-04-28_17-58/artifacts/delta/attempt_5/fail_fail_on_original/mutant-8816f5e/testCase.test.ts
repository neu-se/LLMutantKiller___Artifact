import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('does not call embed handler when thisData is null even if otherData is an embed object', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData = null (retain: null), otherData = embed object
      // Original: thisData !== null fails -> condition false -> skip handler -> no error
      // Mutated: (typeof null === 'object' && null !== null) || (typeof obj === 'object' && obj !== null)
      //        = false || true -> enters handler -> Object.keys(null) throws TypeError
      const a = new Delta([{ retain: null as any }]);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      // In original, this should not throw - it just skips the handler
      // transformedData = otherData (since typeof otherData === 'object')
      // then delta.retain({delta:[{insert:'b'}]}, ...) -> chopped result
      const result = a.transform(b, true);
      expect(result).toEqual(new Delta().retain({ delta: [{ insert: 'b' }] }));
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});