import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() retain embed with retain embed', () => {
  it('retaining an embed with another embed retain should produce a retain op, not an insert op', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisOp.retain is an object (not null), otherOp.retain is also an object
      // Original: action = thisOp.retain == null ? 'insert' : 'retain' => 'retain'
      // Mutated:  action = true ? 'insert' : 'retain' => 'insert'
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const result = a.compose(b);

      // Original produces a retain op; mutated produces an insert op
      expect(result.ops[0].retain).toEqual({ delta: [{ insert: 'ba' }] });
      expect(result.ops[0].insert).toBeUndefined();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});