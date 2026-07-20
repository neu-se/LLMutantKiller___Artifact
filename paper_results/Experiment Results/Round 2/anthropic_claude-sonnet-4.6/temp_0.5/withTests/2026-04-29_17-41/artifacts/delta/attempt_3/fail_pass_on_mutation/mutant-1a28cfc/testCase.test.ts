import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('getEmbedTypeAndData null b parameter', () => {
  it('throws an error when b is null during invert with embed retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // Create a base delta with a null insert (bypassing type system)
      // This makes b === null in getEmbedTypeAndData when called from invert
      const base = new Delta([{ insert: null as unknown as string }]);
      // retain an embed object triggers getEmbedTypeAndData(op.retain, baseOp.insert)
      // where baseOp.insert is null
      const delta = new Delta([{ retain: { delta: [{ insert: 'a' }] } }]);

      // Original: throws because b === null check triggers the error
      // Mutated: does NOT throw because b === null check is replaced with false
      expect(() => {
        delta.invert(base);
      }).toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});