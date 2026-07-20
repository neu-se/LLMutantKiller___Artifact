import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain embed with retain embed produces retain op', () => {
  it('composing two retain embeds produces a retain op not an insert op', () => {
    Delta.registerEmbed('img', {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({ merged: true }),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ merged: true }),
      invert: (_a: unknown, _b: unknown) => ({ merged: true }),
    });

    try {
      // thisOp.retain = {img: {v:1}} (object, not null)
      // otherOp.retain = {img: {v:2}} (object)
      // Original: action='retain' -> newOp.retain = {img:{merged:true}}
      // Mutated:  action='insert' -> newOp.insert = {img:{merged:true}}
      // After chop(): retain embed is NOT chopped (it has no attributes check),
      // so result.ops[0] should have retain in original, insert in mutated
      const a = new Delta().retain({ img: { v: 1 } });
      const b = new Delta().retain({ img: { v: 2 } });

      const result = a.compose(b);

      expect(result.ops).toHaveLength(1);
      expect(result.ops[0]).toHaveProperty('retain');
      expect(result.ops[0]).not.toHaveProperty('insert');
      expect(result.ops[0].retain).toEqual({ img: { merged: true } });
    } finally {
      Delta.unregisterEmbed('img');
    }
  });
});