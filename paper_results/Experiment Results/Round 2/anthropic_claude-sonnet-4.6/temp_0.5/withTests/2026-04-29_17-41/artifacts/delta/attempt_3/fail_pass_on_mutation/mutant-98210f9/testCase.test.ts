import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with retain embed on both sides', () => {
  it('correctly composes two retain embeds without throwing', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      // Original: action='retain', uses thisOp.retain correctly -> produces valid result
      // Mutated: action='insert', uses thisOp.insert (undefined) -> throws error
      const result = a.compose(b);

      const expected = new Delta().retain({
        delta: [{ insert: 'ba' }],
      });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});