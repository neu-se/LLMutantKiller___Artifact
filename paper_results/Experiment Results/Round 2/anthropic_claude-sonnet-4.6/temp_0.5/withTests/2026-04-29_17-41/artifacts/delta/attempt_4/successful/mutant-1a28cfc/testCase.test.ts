import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('getEmbedTypeAndData null b parameter', () => {
  it('throws when b (baseOp.insert) is null during invert with object retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // base has an op where insert is null - this becomes b in getEmbedTypeAndData
      // typeof null === 'object', so only the b === null check distinguishes original from mutant
      const base = new Delta([{ insert: null as unknown as string }]);
      const delta = new Delta([{ retain: { delta: [{ insert: 'a' }] } }]);

      // Original code: typeof null !== 'object' is false, but null === null is true -> throws
      // Mutated code: typeof null !== 'object' is false, false is false -> does NOT throw
      expect(() => {
        delta.invert(base);
      }).toThrowError('cannot retain a object');
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});