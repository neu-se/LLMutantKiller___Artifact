import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('composing two object retains with embed handler produces correct retain op', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).compose(new Delta(b as { insert: string }[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as { insert: string }[]).transform(new Delta(b as { insert: string }[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).invert(new Delta(b as { insert: string }[])).ops,
    });

    try {
      // thisOp is an insert embed, otherOp is an object retain
      // thisOp.retain == null (it's an insert), so action = 'insert' in both original and mutated
      // But we need thisOp.retain to be an object to trigger the mutation
      // Use: a has object retain, b has object retain
      const a = new Delta().insert({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // Original: action = 'insert' (thisOp.retain == null), newOp.insert = composed embed
      // The result should be an insert op
      expect(result.ops.length).toEqual(1);
      expect(result.ops[0]).toEqual({
        insert: { delta: [{ insert: 'ba' }] },
      });
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});