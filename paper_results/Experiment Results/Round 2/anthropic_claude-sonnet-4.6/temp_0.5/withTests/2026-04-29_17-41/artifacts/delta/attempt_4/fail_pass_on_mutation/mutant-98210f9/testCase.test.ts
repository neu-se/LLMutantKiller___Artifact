import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() retain embed with retain embed', () => {
  it('result should contain retain not insert when composing retain embed with retain embed', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown, keepNull: boolean) =>
        new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // Original: action='retain' -> newOp has retain property
      // Mutated: action='insert' -> newOp has insert property instead
      expect(result.ops.length).toEqual(1);
      expect(result.ops[0].retain).toBeDefined();
      expect(result.ops[0].insert).toBeUndefined();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});