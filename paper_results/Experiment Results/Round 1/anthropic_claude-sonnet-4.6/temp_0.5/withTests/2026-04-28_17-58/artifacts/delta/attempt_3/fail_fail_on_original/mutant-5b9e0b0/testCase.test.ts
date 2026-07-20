import Delta from "../../src/Delta";

describe('compose()', () => {
  it('retain an embed with an embed uses retain action correctly', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).compose(new Delta(b as { insert: string }[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as { insert: string }[]).transform(new Delta(b as { insert: string }[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { insert: string }[]).invert(new Delta(b as { insert: string }[])).ops,
    });

    try {
      // thisOp has object retain (retain !== null), otherOp also has object retain
      // Original: action = 'retain', so newOp.retain = { delta: composed }
      // Mutated:  action = '',       so newOp[''] = { delta: composed }, newOp.retain is undefined
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      expect(result.ops.length).toEqual(1);
      expect(result.ops[0].retain).toBeDefined();
      expect(result.ops[0].retain).toEqual({
        delta: [{ insert: 'b' }, { insert: 'a' }],
      });
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});