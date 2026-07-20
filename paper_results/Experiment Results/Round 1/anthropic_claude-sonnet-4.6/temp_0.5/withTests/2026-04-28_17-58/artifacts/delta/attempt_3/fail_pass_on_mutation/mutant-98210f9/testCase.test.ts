import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() retain embed with retain embed', () => {
  it('composing two retain-embed ops should result in a retain op that can be applied as a transformation', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisOp has retain=object (not null), otherOp has retain=object
      // Original: action='retain', so newOp.retain = composed embed
      // Mutated:  action='insert', so newOp.insert = composed embed (wrong!)
      const base = new Delta().insert({ delta: [{ insert: 'a' }] });
      const change1 = new Delta().retain({ delta: [{ insert: 'b' }] });
      const change2 = new Delta().retain({ delta: [{ insert: 'c' }] });

      // Compose change1 and change2 - should produce a retain op
      const composed = change1.compose(change2);

      // The composed delta applied to base should give the same result as applying change1 then change2
      const expected = base.compose(change1).compose(change2);
      const actual = base.compose(composed);

      expect(actual).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});