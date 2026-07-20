import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with retain embed on retain embed', () => {
  it('composing a retain-embed with another retain-embed should produce a retain, not an insert', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // thisOp is a retain with an object embed (not null), otherOp is also a retain with an object embed
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const result = a.compose(b);

      // In the original code: action = 'retain' (since thisOp.retain != null)
      // So newOp should be { retain: { delta: [...] } }
      // In the mutated code: action = 'insert' (always)
      // So newOp would be { insert: { delta: [...] } }
      expect(result.ops.length).toEqual(1);
      expect(result.ops[0].retain).toBeDefined();
      expect(result.ops[0].insert).toBeUndefined();
      expect(result.ops[0].retain).toEqual({ delta: [{ insert: 'ba' }] });
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});