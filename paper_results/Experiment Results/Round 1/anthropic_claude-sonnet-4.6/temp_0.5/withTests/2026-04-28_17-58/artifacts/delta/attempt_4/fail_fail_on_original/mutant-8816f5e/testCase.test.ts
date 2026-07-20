import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform embed retain against embed retain of same type uses handler result', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // Both thisData and otherData are embed objects of same type
      // Original: condition true -> handler called -> transformedData = handler result
      // Mutated: same path, but let's find where they diverge
      // 
      // Key: when thisData is NULL object (null) and otherData is object
      // Original: thisData !== null fails -> condition false -> skip handler
      // Mutated: (typeof null === 'object' && null !== null) || (typeof obj === 'object' && obj !== null)
      //          = (true && false) || (true && true) = false || true = true -> handler called with null thisData
      const a = new Delta().retain(null as any);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(() => a.transform(b, true)).toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});